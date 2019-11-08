import * as actions from '../actions';
import * as selectors from '../selectors';
import * as utils from '../utils';

import { getSegmentId, getColumnAndRowIndexBySegmentId } from '../../map';
import { getTileSelectionList, getTileSelectionGrid } from '../../tools';

export default ({ inputActions, inputModifiers, ...rest }) => dispatch => {
  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickNoModifiers(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickAndHoldNoModifiers(rest) );
  }

  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, ['altKey'])) {
    dispatch( _leftClickAltModifier(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, ['altKey'])) {
    dispatch( _leftClickAndHoldAltModifier(rest) );
  }
}

const _leftClickNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const selectionGrid = getTileSelectionGrid(state);

  const initialSegmentIndexes = getColumnAndRowIndexBySegmentId(state, { segmentId });

  const indexes = dispatch( _getColumnAndRowIndexesOfSelection({ selectionGrid, initialColumnIndex: Number(columnIndex), initialRowIndex: Number(rowIndex), initialSegmentIndexes }) );

  indexes.forEach(column => {
    column.forEach(({
      mapGridColumnIndex, mapGridRowIndex,
      tilemapColumnIndex, tilemapRowIndex,
      tilesetColumnIndex, tilesetRowIndex
    }) => {
      const segmentId = getSegmentId(state, { columnIndex: mapGridColumnIndex, rowIndex: mapGridRowIndex });

      dispatch( actions.setSingleTileValue({
        segmentId,
        layerId,
        columnIndex: tilemapColumnIndex,
        rowIndex: tilemapRowIndex,
        value: [tilesetColumnIndex, tilesetRowIndex]
      }));
    });
  });
}

const _getColumnAndRowIndexesOfSelection = ({ selectionGrid, initialColumnIndex, initialRowIndex, initialSegmentIndexes }) => dispatch => {
  const tilemapWidth = 8;
  let startColumnIndex = initialColumnIndex;
  let mapGridColumnIndex = initialSegmentIndexes.columnIndex;
  let stepColumns = 0;

  return selectionGrid.map((column, columnIndex) => {
    let tilemapColumnIndex = startColumnIndex + columnIndex;

    if ((tilemapColumnIndex + 1) > tilemapWidth) {
      startColumnIndex = -stepColumns;
      tilemapColumnIndex = 0;
      mapGridColumnIndex += 1;
    }
    stepColumns++;

    return dispatch( _getRowIndexesOfCurrentColumn({ column, columnIndex, tilemapColumnIndex, mapGridColumnIndex, initialRowIndex, initialSegmentIndexes }) )
  })
}

const _getRowIndexesOfCurrentColumn = ({ column, columnIndex, tilemapColumnIndex, mapGridColumnIndex, initialRowIndex, initialSegmentIndexes }) => dispatch => {
  const tilemapHeight = 8;
  let startRowIndex = initialRowIndex;
  let mapGridRowIndex = initialSegmentIndexes.rowIndex;
  let stepRows = 0;

  return column.map(({ tilesetColumnIndex, tilesetRowIndex }, rowIndex) => {
    let tilemapRowIndex = startRowIndex + rowIndex;

    if ((tilemapRowIndex + 1) > tilemapHeight) {
      startRowIndex = -stepRows;
      tilemapRowIndex = 0;
      mapGridRowIndex += 1;
    }
    stepRows++;

    return {
      mapGridColumnIndex,
      mapGridRowIndex,

      tilemapColumnIndex,
      tilemapRowIndex,

      tilesetColumnIndex,
      tilesetRowIndex
    }
  })
}

const _leftClickAndHoldNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const value = getTileSelectionList(state);
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (value === currentValue) return;

  dispatch( actions.setSingleTileValue({ segmentId, layerId, columnIndex, rowIndex, value }) );
}

const _leftClickAltModifier = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}

const _leftClickAndHoldAltModifier = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}
