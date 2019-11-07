import * as actions from '../actions';
import * as selectors from '../selectors';
import * as utils from '../utils';

import { getTileSelection } from '../../tools';

export default ({ inputActions, inputModifiers, ...rest }) => dispatch => {
  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickNoModifiers(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickAndHoldNoModifiers(rest) );
  }

  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, ['altKey'])) {
    dispatch( _leftClickAltModifier(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, ['altKey'])) {
    dispatch( _leftClickAndHoldAltModifier(rest) );
  }
}

const _leftClickNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const value = getTileSelection(state);
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (value === currentValue) return;

  dispatch( actions.setSingleTileValue({ segmentId, layerId, columnIndex, rowIndex, value }) );
}

const _leftClickAndHoldNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const value = getTileSelection(state);
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (value === currentValue) return;

  dispatch( actions.setSingleTileValue({ segmentId, layerId, columnIndex, rowIndex, value }) );
}

const _leftClickAltModifier = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}

const _leftClickAndHoldAltModifier = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}
