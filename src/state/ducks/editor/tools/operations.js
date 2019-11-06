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

export const setTileSelection = ({ selection: selectionList }) => dispatch => {
  /**
    --> selectionList: array of selected tiles; child objects contain the columnIndex and
    rowIndex of their location on the tileset image
      columnIndex -> columnIndex of selection starting from left side of the tileset
      rowIndex -> rowIndex of selection starting from top row of the tileset

    --> normalizedSelectionList: selection starting in the top-left corner of the actual selection
      normalizedSelectionColumnIndex -> columnIndex of selection starting from left column of actual selection
      normalizedSelectionRowIndex -> rowIndex of selection starting from top row of actual selection

    --> selectionGrid: two dimensional array representing the normalized selection area including empty spaces.
    Contains either an object with the tilesetColumnIndex and tilesetRowIndex OR a null value.
      tilesetColumnIndex -> columnIndex location in tileset image
      tilesetRowIndex -> rowIndex location in tileset image
  **/
  if (selectionList.length === 0) return;
  // const sortedSelection = _.sortBy(selection, ['columnIndex', 'rowIndex']);

  const { columnIndex: lowestColumnIndex } = _.minBy(selectionList, 'columnIndex');
  const { columnIndex: highestColumnIndex } = _.maxBy(selectionList, 'columnIndex');
  const { rowIndex: lowestRowIndex } = _.minBy(selectionList, 'rowIndex');
  const { rowIndex: highestRowIndex } = _.maxBy(selectionList, 'rowIndex');

  const selectionWidth = (highestColumnIndex + 1) - lowestColumnIndex;
  const selectionHeight = (highestRowIndex + 1) - lowestRowIndex;
  const columnOffset = lowestColumnIndex;
  const rowOffset = lowestRowIndex;
  const selectionCount = selectionList.length;

  const normalizedSelectionList = selectionList
    .map(({ columnIndex, rowIndex }) => ({
      columnIndex: columnIndex - columnOffset,
      rowIndex: rowIndex - rowOffset,
      tilesetColumnIndex: columnIndex,
      tilesetRowIndex: rowIndex
    }));

  const selectionGrid = buildTwoDimensionalArray({
    columns: selectionWidth,
    rows: selectionHeight,
    mapFn: ({ columnIndex, rowIndex }) => {
      const selected = _.find(normalizedSelectionList, { columnIndex , rowIndex });

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

  console.log(normalizedSelectionList);
  console.log(selectionGrid);
  console.log(selectionCount);
};

export const clearTileSelection = actions.clearTileSelection;
