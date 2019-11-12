import _ from 'lodash';

export const undo = (state, action) => {
  return state
}

export const redo = (state, action) => {
  return state
}

export const openUndoAction = (state, action) => {
  // clear any undo's above max
  return {
    ...state
  }
}

export const recordUndoAction = (state, action) => {
  const { type, toolType, list } = action.payload;
  console.log(list)
  return {
    ...state,
    recording: [
      ...state.recording,
      ...list.map(({ segmentId, layerId, columnIndex, rowIndex, currentValue: value }) => {
        if (_.find(state.recording, { segmentId, layerId, columnIndex, rowIndex })) {
          console.log('duplicate: ', segmentId, layerId, columnIndex, rowIndex)
          return null;
        }
        console.log('new entry: ', segmentId, layerId, columnIndex, rowIndex, value)
        return {
          segmentId,
          layerId,
          columnIndex,
          rowIndex,
          value,
          uniqueId: `${segmentId}-${layerId}-${columnIndex}-${rowIndex}`
        }
      }).filter(val => val)
    ]
  }
}

export const closeUndoAction = (state, action) => {

  console.log(state.recording)
  return {
    ...state,
    recording: [],
    undo: [
      [...state.recording],
      ...state.undo
    ]
  }
}

export const clearUndoCollection = (state, action) => {
  return state
}

export const clearRedoCollection = (state, action) => {
  return state
}
