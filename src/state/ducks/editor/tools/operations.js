import _ from 'lodash';

import * as actions from './actions';
import * as selectors from './selectors';

import { buildTwoDimensionalArray } from 'lib/utils';

export const setCurrentTool = actions.setCurrentTool;
const allowedZoomLevels = [
  0.125, 0.25, 0.50, 0.75,
  1.00,
  1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00, 3.50, 4.00, 4.50, 5.00
]

export const zoomIn = () => (dispatch, getState) => {
  const state = getState();
  const currentZoomScaleModifier = selectors.getZoomScaleModifier(state);
  const indexOf = allowedZoomLevels.indexOf(currentZoomScaleModifier);
  const nextZoomScaleModifier = allowedZoomLevels[indexOf + 1];

  if (nextZoomScaleModifier) {
    dispatch( actions.setZoomScaleModifier({ value: nextZoomScaleModifier }) );
  }
}

export const zoomOut = () => (dispatch, getState) => {
  const state = getState();
  const currentZoomScaleModifier = selectors.getZoomScaleModifier(state);
  const indexOf = allowedZoomLevels.indexOf(currentZoomScaleModifier);
  const nextZoomScaleModifier = allowedZoomLevels[indexOf - 1];

  if (nextZoomScaleModifier) {
    dispatch( actions.setZoomScaleModifier({ value: nextZoomScaleModifier }) );
  }
}

export const resetZoom = () => (dispatch, getState) => {
  dispatch( actions.setZoomScaleModifier({ value: 1 }));
}

export const setColorValue = actions.setColorValue;

export const setTileSelection = ({ selected }) => dispatch => {
  if (selected.length === 0) return;

  const { columnIndex: lowestColumnIndex } = _.minBy(selected, 'columnIndex');
  const { columnIndex: highestColumnIndex } = _.maxBy(selected, 'columnIndex');
  const { rowIndex: lowestRowIndex } = _.minBy(selected, 'rowIndex');
  const { rowIndex: highestRowIndex } = _.maxBy(selected, 'rowIndex');

  const selectionBoundaryWidth = (highestColumnIndex + 1) - lowestColumnIndex;
  const selectionBoundaryHeight = (highestRowIndex + 1) - lowestRowIndex;
  const selectionColumnOffset = lowestColumnIndex;
  const selectionRowOffset = lowestRowIndex;
  // const selectionCount = selected.length;

  const sortedSelection = _.sortBy(selected, ['columnIndex', 'rowIndex']);
  const selectionList = sortedSelection
    .map(({ columnIndex, rowIndex }) => ({
      columnIndex: columnIndex - selectionColumnOffset,
      rowIndex: rowIndex - selectionRowOffset,
      tilesetColumnIndex: columnIndex,
      tilesetRowIndex: rowIndex
    }));

  const selectionGrid = buildTwoDimensionalArray({
    columns: selectionBoundaryWidth,
    rows: selectionBoundaryHeight,
    mapFn: ({ columnIndex, rowIndex }) => {
      const selected = _.find(selectionList, { columnIndex , rowIndex });

      if (selected) {
        const { tilesetColumnIndex, tilesetRowIndex } = selected;

        return ({
          tilesetColumnIndex,
          tilesetRowIndex
        });
      }

      return null;
    }
  });

  return dispatch( actions.setTileSelection({ grid: selectionGrid, list: selectionList }) );
}

export const clearTileSelection = actions.clearTileSelection;
