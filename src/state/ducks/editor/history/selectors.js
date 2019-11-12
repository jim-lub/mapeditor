export const getUndo = state => state.editor.history.undo[state.editor.history.undo.length - 1] || null;
export const getUndoCollection = state => state.editor.history.undo;
export const getUndoCount = state => state.editor.history.undo.length || 0;

export const getRedo = state => state.editor.history.redo[state.editor.history.redo.length - 1] || null;
export const getRedoCollection = state => state.editor.history.redo;
export const getRedoCount = state => state.editor.history.redo.length || 0;
