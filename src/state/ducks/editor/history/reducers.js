import _ from 'lodash';

export const undo = (state, action) => {
  return {
    ...state,
    undo: [
      ...state.undo.map((data, index) => {
        if (index !== 0) {
          return data;
        }

        return null;
      })
      .filter(val => val)
    ],
    redo: [
      state.undo[0],
      ...state.redo
    ]
  }
}

export const redo = (state, action) => {
  return {
    ...state,
    undo: [
      state.redo[0],
      ...state.undo
    ],
    redo: [
      ...state.redo.map((data, index) => {
        if (index !== 0) {
          return data;
        }

        return null;
      })
      .filter(val => val)
    ]
  }
}

export const openUndoAction = (state, action) => {
  const MAX_HISTORY = 50;

  if (state.undo.length < MAX_HISTORY) {
    return state;
  }

  return {
    ...state,
    undo: [
      ...state.undo.map((data, index) => {
        if (index < MAX_HISTORY) {
          return data;
        }

        return null;
      })
      .filter(val => val)
    ]
  }
}

export const recordUndoAction = (state, action) => {
  const { type, toolType, list } = action.payload;

  return {
    ...state,
    recording: {
      ...state.recording,
      type,
      toolType,
      list: [
        ...state.recording.list,
        ...list.map(({ segmentId, layerId, columnIndex, rowIndex, value, undoValue }) =>
          (_.find(state.recording.list, { segmentId, layerId, columnIndex, rowIndex }))
            ?  null
            : { segmentId, layerId, columnIndex, rowIndex, value, undoValue }
        ).filter(val => val)
      ]
    }
  }
}

export const closeUndoAction = (state, action) => {

  if (!state.recording.type || !state.recording.toolType || (state.recording.list.length === 0)) {
    return state
  }
  
  return {
    ...state,
    recording: {
      type: null,
      toolType: null,
      list: []
    },
    undo: [
      state.recording,
      ...state.undo
    ],
    redo: []
  }
}

export const clearUndoCollection = (state, action) => {
  return {
    ...state,
    recording: {
      type: null,
      toolType: null,
      list: []
    },
    undo: []
  }
}

export const clearRedoCollection = (state, action) => {
  return {
    ...state,
    recording: {
      type: null,
      toolType: null,
      list: []
    },
    redo: []
  }
}
