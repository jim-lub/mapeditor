import _ from 'lodash';

import * as utils from './utils';

import * as toolTypes from 'lib/constants/toolTypes';

export const handleUserInput = ({
  inputSegmentId, inputColumnIndex, inputRowIndex,
  inputActions, inputModifiers
}) => (dispatch, getState) => {
  const currentTool = 'paintBrush';

  switch (currentTool) {
    case toolTypes.paintBrush:
      return _handlePaintBrushInput()

    case toolTypes.tileStamp:
      return _handleTileStampInput();

    case toolTypes.eraser:
      return _handleEraserInput();

    case toolTypes.eyeDropper:
      return _handleEyeDroppperInput();

    default:
      return null;
  }
}

/*** paintBrushInput ***/
const _handlePaintBrushInput = ({ inputActions, inputModifiers }) => dispatch => {
  if (utils.inputModifiersObjectContains(inputModifiers, [])) {
    return _set();
  }

  if (utils.inputModifiersObjectContains(inputModifiers, ['shiftKey'])) {
    return _clear();
  }
}

/*** tileStampInput ***/
const _handleTileStampInput = ({ inputActions, inputModifiers }) => dispatch => {
  if (utils.inputModifiersObjectContains(inputModifiers, [])) {
    return _set();
  }

  if (utils.inputModifiersObjectContains(inputModifiers, ['shiftKey'])) {
    return _clear();
  }
}

/*** eraserInput ***/
const _handleEraserInput = ({ inputActions, inputModifiers }) => dispatch => {
  if (utils.inputModifiersObjectContains(inputModifiers, [])) {
    return _clear();
  }
}

/*** eyeDropperInput ***/
const _handleEyeDroppperInput = ({ inputActions, inputModifiers }) => dispatch => {
  _get();
}

const _get = () => {

}

const _set = () => {

}

const _clear = () => {

}
