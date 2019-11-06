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
export const setTileValue = actions.setTileValue;

export const setTileSelection = ({ selection }) => dispatch => {
  if (selection.length === 0) return;
  const sortedSelection = _.sortBy(selection, ['columnIndex', 'rowIndex']);

  const { columnIndex: lowestColumnIndex } = _.minBy(sortedSelection, 'columnIndex');
  const { columnIndex: highestColumnIndex } = _.maxBy(sortedSelection, 'columnIndex');
  const { rowIndex: lowestRowIndex } = _.minBy(sortedSelection, 'rowIndex');
  const { rowIndex: highestRowIndex } = _.maxBy(sortedSelection, 'rowIndex');

  const selectionWidth = (highestColumnIndex + 1) - lowestColumnIndex;
  const selectionHeight = (highestRowIndex + 1) - lowestRowIndex;
  const columnOffset = lowestColumnIndex;
  const rowOffset = lowestRowIndex;

  const normalizedSelection = sortedSelection.map(({ columnIndex, rowIndex }) => ({
    columnIndex: columnIndex - columnOffset,
    rowIndex: rowIndex - rowOffset,
    tilesetColumnIndex: columnIndex,
    tilesetRowIndex: rowIndex
  }));

  const selectionPattern = buildTwoDimensionalArray({
    columns: selectionWidth,
    rows: selectionHeight,
    mapFn: ({ columnIndex: patternColumIndex, rowIndex: patternRowIndex }) => {
      const selected = _.find(normalizedSelection, { columnIndex: patternColumIndex, rowIndex: patternRowIndex });

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

  console.log(normalizedSelection);
  console.log(selectionPattern);
};

export const clearTileSelection = actions.clearTileSelection;
