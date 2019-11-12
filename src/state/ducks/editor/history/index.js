import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  recording: {
    type: null,
    toolType: null,
    list: []
  },
  undo: [
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1', '2'] },
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1'] },
    // { type: 'CLEAR', toolType: 'editor/tools/ERASER', list: ['1'] },
    // { type: 'CLEAR', toolType: 'editor/tools/ERASER', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/PAINT_BRUSH', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/PAINT_BRUSH', list: ['1'] },
  ],
  redo: [
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1', '3', '4'] },
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/TILE_STAMP', list: ['1'] },
    // { type: 'CLEAR', toolType: 'editor/tools/ERASER', list: ['1'] },
    // { type: 'CLEAR', toolType: 'editor/tools/ERASER', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/PAINT_BRUSH', list: ['1'] },
    // { type: 'SET', toolType: 'editor/tools/PAINT_BRUSH', list: ['1'] },
  ]
}

export default createReducer( initialState )({
  [ types.undo ]: (state, action) => reducers.undo(state, action),
  [ types.redo ]: (state, action) => reducers.redo(state, action),

  [ types.openUndoAction ]: (state, action) => reducers.openUndoAction(state, action),
  [ types.recordUndoAction ]: (state, action) => reducers.recordUndoAction(state, action),
  [ types.closeUndoAction ]: (state, action) => reducers.closeUndoAction(state, action),

  [ types.clearUndoCollection ]: (state, action) => reducers.clearUndoCollection(state, action),
  [ types.clearRedoCollection ]: (state, action) => reducers.clearRedoCollection(state, action),
});

/*** operations ***/
export const clearStore = operations.clearStore;

export const undo = operations.undo;
export const redo = operations.redo;

export const openUndoAction = operations.openUndoAction;
export const recordUndoAction = operations.recordUndoAction;
export const closeUndoAction = operations.closeUndoAction;

/*** selectors ***/
export const getUndo = selectors.getUndo;
export const getUndoCollection = selectors.getUndoCollection;
export const getUndoCount = selectors.getUndoCount;

export const getRedo = selectors.getUndo;
export const getRedoCollection = selectors.getRedoCollection;
export const getRedoCount = selectors.getRedoCount;
