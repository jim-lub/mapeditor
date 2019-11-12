import * as actions from '../actions';
import * as selectors from '../selectors';
import * as utils from '../utils';

import { recordUndoAction } from '../../history';
import { getColorValue } from '../../tools';

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
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const color = getColorValue(state);
  const value = color.hex.substring(1);
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (value === currentValue) return;

  const list = [{ segmentId, layerId, columnIndex, rowIndex, value, undoValue: currentValue }];

  dispatch( recordUndoAction({ type: 'SET', toolType: toolTypes.tileStamp, list }) );
  dispatch( actions.setSingleTileValue({ segmentId, layerId, columnIndex, rowIndex, value }) );
}

const _leftClickAndHoldNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const color = getColorValue(state);
  const value = color.hex.substring(1);
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (value === currentValue) return;

  const list = [{ segmentId, layerId, columnIndex, rowIndex, value, undoValue: currentValue }];

  dispatch( recordUndoAction({ type: 'SET', toolType: toolTypes.tileStamp, list }) );
  dispatch( actions.setSingleTileValue({ segmentId, layerId, columnIndex, rowIndex, value }) );
}

const _leftClickShiftModifier = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  const list = [{ segmentId, layerId, columnIndex, rowIndex, value: 0, undoValue: currentValue }];

  dispatch( recordUndoAction({ type: 'CLEAR', toolType: toolTypes.tileStamp, list }) );
  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}

const _leftClickAndHoldShiftModifier = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  const list = [{ segmentId, layerId, columnIndex, rowIndex, value: 0, undoValue: currentValue }];

  dispatch( recordUndoAction({ type: 'CLEAR', toolType: toolTypes.tileStamp, list }) );
  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}
