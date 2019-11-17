// import _ from 'lodash';

import * as actions from './actions';
import * as selectors from './selectors';

import { createPattern, clearPattern } from '../user-input';

import * as layerTypes from 'lib/constants/layerTypes';

export const clearStore = () => dispatch => {

}

export const setCurrentTool = ({ toolType }) => (dispatch, getState) => {
  dispatch( actions.setCurrentTool({ toolType }) );
  dispatch( clearPattern() );
};

export const setColorValue = ({ hex, rgb, hsl }) => dispatch => {
  dispatch( createPattern({
    layerType: layerTypes.color,
    size: {
      columns: 1,
      rows: 1,
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
