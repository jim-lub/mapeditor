import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  undo: [],
  redo: []
}

export default createReducer( initialState )({
  [ types.undo ]: (state, action) => reducers.undo(state, action),
  [ types.redo ]: (state, action) => reducers.redo(state, action),

  [ types.newRecording ]: (state, action) => reducers.newRecording(state, action),
  [ types.record ]: (state, action) => reducers.record(state, action),
  [ types.closeRecording ]: (state, action) => reducers.closeRecording(state, action),

  [ types.clearUndoCollection ]: (state, action) => reducers.clearUndoCollection(state, action),
  [ types.clearRedoCollection ]: (state, action) => reducers.clearRedoCollection(state, action),
});

/*** operations ***/
export const clearStore = operations.clearStore;

export const undo = operations.undo;
export const redo = operations.redo;

/*** selectors ***/
export const getUndo = selectors.getUndo();
export const getUndoCollection = selectors.getUndoCollection();

export const getRedo = selectors.getUndo();
export const getRedoCollection = selectors.getRedoCollection();

export const getRecordingStatus = selectors.getRecordingStatus();
