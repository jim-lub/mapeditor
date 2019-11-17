import _ from 'lodash';

import * as actions from './actions';
import * as selectors from './selectors';

import { setTileValues } from '../segments';

// import { asyncAccumulator } from 'lib/editor/performance/utils';

export const clearStore = () => dispatch => {
  dispatch( actions.clearUndoCollection() );
  dispatch( actions.clearRedoCollection() );
}

export const undo = () => (dispatch, getState) => {
  const state = getState();
  const undo = selectors.getUndo(state);

  // const entries = 5000;
  // const dataSet = [...new Array( entries )].map((val, index) => ({
  //   index
  // }));
  //
  // const accFunc = ({ index }) => ({
  //   index,
  //   acc: true
  // })
  //
  // asyncAccumulator({
  //   func: accFunc,
  //   dataSet,
  //   batchSize: 500,
  //   log: true
  // })
  // .then((acc) => console.log(acc));

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

export const openUndoAction = actions.openUndoAction;
export const recordUndoAction = actions.recordUndoAction;
export const closeUndoAction = actions.closeUndoAction;
