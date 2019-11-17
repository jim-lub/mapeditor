import _ from 'lodash';

import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';

import { getCurrentTool } from '../tools';
import { setTileValues, clearTileValues } from '../segments';

import * as toolTypes from 'lib/constants/toolTypes';
// import toolConstants from 'lib/constants/toolConstants';

export const createPattern = ({ layerType, size, value, selection }) => dispatch => {
  if (size) {
    const { grid = [], list = [] } = utils.createPatternBySize({ size, value });

    dispatch( actions.setPattern({ layerType, grid, list }) );
  }

  if (selection) {
    const { grid = [], list = [] } = utils.createPatternBySelection({ selection });

    dispatch( actions.setPattern({ layerType, grid, list }) );
  }
}

export const handleUserInput = ({
  segmentId: inputSegmentId, columnIndex: inputColumnIndex, rowIndex: inputRowIndex,
  inputActions, inputModifiers
}) => (dispatch, getState) => {
  const state = getState();
  const currentTool = getCurrentTool(state);

  switch (currentTool) {
    case toolTypes.paintBrush:
      return dispatch( _handlePaintBrushInput({ inputActions, inputModifiers, inputSegmentId, inputColumnIndex, inputRowIndex }) );

    case toolTypes.tileStamp:
      return dispatch( _handleTileStampInput({ inputActions, inputModifiers, inputSegmentId, inputColumnIndex, inputRowIndex }) );

    case toolTypes.eraser:
      return dispatch( _handleEraserInput({ inputActions, inputModifiers, inputSegmentId, inputColumnIndex, inputRowIndex }) );

    case toolTypes.eyeDropper:
      return dispatch( _handleEyeDroppperInput({ inputActions, inputModifiers, inputSegmentId, inputColumnIndex, inputRowIndex }) );

    default:
      return null;
  }
}

/*** paintBrushInput ***/
const _handlePaintBrushInput = ({ inputActions, inputModifiers, ...rest }) => (dispatch, getState) => {
  const state = getState();
  const pattern = selectors.getPattern(state);

  if (utils.inputModifiersObjectContains(inputModifiers, [])) {
    dispatch( _set({ pattern, ...rest }) );
  }

  if (utils.inputModifiersObjectContains(inputModifiers, ['shiftKey'])) {
    dispatch( _clear({ pattern, ...rest }) );
  }
}

/*** tileStampInput ***/
const _handleTileStampInput = ({ inputActions, inputModifiers, ...rest }) => (dispatch, getState) => {
  const state = getState();
  const pattern = selectors.getPattern(state);

  if (utils.inputModifiersObjectContains(inputModifiers, [])) {
    dispatch( _set({ pattern, ...rest }) );
  }

  if (utils.inputModifiersObjectContains(inputModifiers, ['shiftKey'])) {
    dispatch( _clear({ pattern, ...rest }) );
  }
}

/*** eraserInput ***/
const _handleEraserInput = ({ inputActions, inputModifiers, ...rest }) => (dispatch, getState) => {
  const state = getState();
  const pattern = selectors.getPattern(state);

  if (utils.inputModifiersObjectContains(inputModifiers, [])) {
    dispatch( _clear({ pattern, ...rest }) );
  }
}

/*** eyeDropperInput ***/
const _handleEyeDroppperInput = ({ inputActions, inputModifiers, ...rest }) => dispatch => {
  _get();
}

const _get = () => dispatch => {

}

const _set = ({ inputSegmentId, inputColumnIndex, inputRowIndex, pattern }) => dispatch => {
  // console.log('SET', pattern)
  dispatch( setTileValues({ inputSegmentId, inputColumnIndex, inputRowIndex, pattern }));
}

const _clear = ({ inputSegmentId, inputColumnIndex, inputRowIndex, pattern }) => dispatch => {
  // console.log('CLEAR', pattern)
  dispatch( clearTileValues({ inputSegmentId, inputColumnIndex, inputRowIndex, pattern }));
}
