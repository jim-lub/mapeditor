import * as actions from './actions';
import * as selectors from './selectors';

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

export const setTileSelection = actions.setTileSelection;
export const clearTileSelection = actions.clearTileSelection;
