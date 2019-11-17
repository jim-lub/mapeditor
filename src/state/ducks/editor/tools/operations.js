import _ from 'lodash';

import * as actions from './actions';
import * as selectors from './selectors';

import { createPattern } from '../user-input';

import { buildGrid } from 'lib/utils';

import * as layerTypes from 'lib/constants/layerTypes';

export const clearStore = () => dispatch => {
  dispatch( actions.clearTileSelection() );
}

export const setCurrentTool = ({ toolType }) => (dispatch, getState) => {
  const state = getState();
  const colorValue = selectors.getColorValue(state);

  dispatch( createPattern({
    layerType: layerTypes.color,
    size: {
      columns: 5,
      rows: 2,
    },
    value: colorValue.hex
  }));

  dispatch( actions.setCurrentTool({ toolType }) );
};

export const setColorValue = ({ hex, rgb, hsl }) => dispatch => {
  dispatch( createPattern({
    layerType: layerTypes.color,
    size: {
      columns: 5,
      rows: 2,
    },
    value: hex
  }));

  dispatch( actions.setColorValue({ hex, rgb, hsl }) );
};

const allowedZoomLevels = [
  0.25, 0.50, 0.75,
  1.00,
  1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 3.00, 3.50, 4.00, 4.50, 5.00
]

export const zoomIn = ({ type }) => (dispatch, getState) => {
  const state = getState();
  const currentZoomScaleModifier = selectors.getZoomScaleModifier(state, { type });
  const indexOf = allowedZoomLevels.indexOf(currentZoomScaleModifier);
  const nextZoomScaleModifier = allowedZoomLevels[indexOf + 1];

  if (nextZoomScaleModifier) {
    dispatch( actions.setZoomScaleModifier({ type, value: nextZoomScaleModifier }) );
  }
}

export const zoomOut = ({ type }) => (dispatch, getState) => {
  const state = getState();
  const currentZoomScaleModifier = selectors.getZoomScaleModifier(state, { type });
  const indexOf = allowedZoomLevels.indexOf(currentZoomScaleModifier);
  const nextZoomScaleModifier = allowedZoomLevels[indexOf - 1];

  if (nextZoomScaleModifier) {
    dispatch( actions.setZoomScaleModifier({ type, value: nextZoomScaleModifier }) );
  }
}

export const resetZoom = ({ type }) => (dispatch, getState) => {
  dispatch( actions.setZoomScaleModifier({ type, value: 1 }));
}

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

  const selectionGrid = buildGrid({
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
