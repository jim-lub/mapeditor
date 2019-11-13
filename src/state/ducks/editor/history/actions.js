import * as types from './types';

export const undo = () => ({
  type: types.undo
});

export const redo = () => ({
  type: types.redo
});

export const openUndoAction = () => ({
  type: types.openUndoAction
});

export const recordUndoAction = ({ type, toolType, list }) => ({
  type: types.recordUndoAction,
  payload: {
    type,
    toolType,
    list
  }
});

export const closeUndoAction = () => ({
  type: types.closeUndoAction
});

export const clearUndoCollection = () => ({
  type: types.clearUndoCollection
});

export const clearRedoCollection = () => ({
  type: types.clearRedoCollection
});
