import * as actions from './actions';
import * as selectors from './selectors';

export const setCurrentTool = actions.setCurrentTool;

export const zoomIn = () => (dispatch, getState) => {
  const state = getState();
  const currentZoomScaleModifier = selectors.getZoomScaleModifier(state);
  const allowedZoomLevels = [0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 3.75, 4.00];
  const indexOf = allowedZoomLevels.indexOf(currentZoomScaleModifier);
  const nextZoomScaleModifier = allowedZoomLevels[indexOf + 1];

  if (nextZoomScaleModifier) {
    dispatch( actions.setZoomScaleModifier({ value: nextZoomScaleModifier }) );
  }
}

export const zoomOut = () => (dispatch, getState) => {
  const state = getState();
  const currentZoomScaleModifier = selectors.getZoomScaleModifier(state);
  const allowedZoomLevels = [0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 3.75, 4.00];
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
