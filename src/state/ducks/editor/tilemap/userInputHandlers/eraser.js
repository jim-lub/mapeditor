import * as actions from '../actions';
import * as selectors from '../selectors';
import * as utils from '../utils';

export default ({ inputActions, inputModifiers, ...rest }) => dispatch => {
  if (inputActions.leftClick && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickNoModifiers(rest) );
  }

  if (inputActions.leftClickAndHold && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    dispatch( _leftClickAndHoldNoModifiers(rest) );
  }
}

const _leftClickNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}

const _leftClickAndHoldNoModifiers = ({
  sceneId, segmentId, layerId, layerProperties,
  columnIndex, rowIndex
}) => (dispatch, getState) => {
  const state = getState();
  const currentValue = selectors.getTilemapDataSegmentById(state, { segmentId })[layerId][columnIndex][rowIndex];

  if (currentValue === 0) return;

  dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
}
