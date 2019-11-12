import _ from 'lodash';

import * as actions from '../actions';
import * as selectors from '../selectors';
import * as utils from '../utils';

import { recordUndoAction } from '../../history';

import {
  getMapProperties,
  getSegmentId,
  getColumnAndRowIndexBySegmentId
} from '../../map';

import { getTileSelectionGrid } from '../../tools';

import * as selectionUtils from 'lib/editor/selection';

import * as toolTypes from 'lib/constants/toolTypes';

export default ({ inputActions, inputModifiers, ...rest }) => dispatch => {
  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickNoModifiers(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickAndHoldNoModifiers(rest) );
  }

  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, ['shiftKey'])) {
    dispatch( _leftClickShiftModifier(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, ['shiftKey'])) {
    dispatch( _leftClickAndHoldShiftModifier(rest) );
  }
}

const _leftClickNoModifiers = ({
  segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const { list, segmentIDs } = dispatch(
    _convertSelection({
      type: 'SET',
      segmentId, layerId, layerProperties,
      columnIndex, rowIndex
    })
  );
  dispatch( recordUndoAction({ type: 'SET', toolType: toolTypes.tileStamp, list }) );
  dispatch( actions.setMultipleTileValues({ list, segmentIDs, layerId }) );
}

const _leftClickAndHoldNoModifiers = ({
  segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const { list, segmentIDs } = dispatch(
    _convertSelection({
      type: 'SET',
      segmentId, layerId, layerProperties,
      columnIndex, rowIndex
    })
  );
  dispatch( recordUndoAction({ type: 'SET', toolType: toolTypes.tileStamp, list }) );
  dispatch( actions.setMultipleTileValues({ list, segmentIDs, layerId }) );
}

const _leftClickShiftModifier = ({
  segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const { list, segmentIDs } = dispatch(
    _convertSelection({
      type: 'CLEAR',
      segmentId, layerId, layerProperties,
      columnIndex, rowIndex
    })
  )
  dispatch( recordUndoAction({ type: 'CLEAR', toolType: toolTypes.eraser, list }) );
  dispatch( actions.setMultipleTileValues({ list, segmentIDs, layerId }) );
}

const _leftClickAndHoldShiftModifier = ({
  segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const { list, segmentIDs } = dispatch(
    _convertSelection({
      type: 'CLEAR',
      segmentId, layerId, layerProperties,
      columnIndex, rowIndex
    })
  )
  dispatch( recordUndoAction({ type: 'CLEAR', toolType: toolTypes.eraser, list }) );
  dispatch( actions.setMultipleTileValues({ list, segmentIDs, layerId }) );
}

const _convertSelection = ({
  type,
  segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const selectionGrid = getTileSelectionGrid(state);
  const { segmentSize } = getMapProperties(state);
  const { tileSize } = layerProperties;

  const { columnIndex: initialMapGridColumnIndex, rowIndex: initialMapGridRowIndex } = getColumnAndRowIndexBySegmentId(state, { segmentId });

  const indexList = selectionUtils.selectionGridToFlattenedTilemapIndexList({
    selectionGrid,
    tilemapSize: {
      columns: segmentSize.width / tileSize.width,
      rows: segmentSize.height / tileSize.height
    },
    initialMapGridColumnIndex,
    initialMapGridRowIndex,
    initialTilemapColumnIndex: columnIndex,
    initialTilemapRowIndex: rowIndex,
  });

  const indexListWithSegmentIDs = indexList.map(({
    mapGridColumnIndex, mapGridRowIndex,
    tilemapColumnIndex, tilemapRowIndex,
    tilesetColumnIndex, tilesetRowIndex
  }) => {
    const segmentId = getSegmentId(state, { columnIndex: mapGridColumnIndex, rowIndex: mapGridRowIndex });
    if (!segmentId) return null;
    const currentValue = selectors.getCurrentTileValueByColumnIndexAndRowIndex(state, { segmentId, layerId, columnIndex: tilemapColumnIndex, rowIndex: tilemapRowIndex });

    return {
      segmentId,
      layerId,
      columnIndex: tilemapColumnIndex,
      rowIndex: tilemapRowIndex,
      value: (type === 'SET') ? [tilesetColumnIndex, tilesetRowIndex] : 0,
      currentValue
    }
  }).filter(segment => segment);

  const segmentIDs = _.uniq( indexListWithSegmentIDs.map(({ segmentId }) => segmentId) );

  return { list: indexListWithSegmentIDs, segmentIDs, layerId };
}
