import _ from 'lodash';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  setTileValues,
  getCurrentTileValue
} from '../segments';

export const clearStore = () => dispatch => {
  dispatch( actions.clearUndoCollection() );
  dispatch( actions.clearRedoCollection() );
}

export const undo = () => (dispatch, getState) => {
  const state = getState();
  const undo = selectors.getUndo(state);

  if (undo) {
    const segmentIDs = _.uniq( undo.list.map(({ segmentId }) => segmentId) );
    const layerId = undo.list[0].layerId;
    const undoList = undo.list.map(({ value, undoValue, ...rest}) => ({ value: undoValue, ...rest }));
    dispatch( setTileValues({ list: undoList, segmentIDs, layerId }) );
    dispatch( actions.undo() );
  }
}

export const redo = () => (dispatch, getState) => {
  const state = getState();
  const redo = selectors.getRedo(state);

  if (redo) {
    const segmentIDs = _.uniq( redo.list.map(({ segmentId }) => segmentId) );
    const layerId = redo.list[0].layerId;
    const redoList = redo.list.map(({ value, undoValue, ...rest}) => ({ value, ...rest }));
    dispatch( setTileValues({ list: redoList, segmentIDs, layerId }) );
    dispatch( actions.redo() );
  }
}

export const recordUndoAction = ({ payload: { layerId, list } }) => (dispatch, getState) => {
  const state = getState();

  const undoList = list.map((props) =>
    ({ undoValue: getCurrentTileValue(state, { layerId, ...props }), layerId, ...props }));

  console.log(undoList)
  // const historyList = list.map(({ segmentId, tilemapColumnIndex, tilemapRowIndex, value }) => {
  //   const undoValue = getCurrentTileValue(state, { segmentId, layerId, tilemapColumnIndex, tilemapRowIndex });
  //
  //   return ({
  //     segmentId,
  //     layerId,
  //     tilemapColumnIndex,
  //     tilemapRowIndex,
  //     redoValue: value,
  //     undoValue
  //   })
  // });

  // dispatch( actions.recordUndoAction({ list: historyList }) );
};

export const openUndoAction = actions.openUndoAction;
export const closeUndoAction = actions.closeUndoAction;
