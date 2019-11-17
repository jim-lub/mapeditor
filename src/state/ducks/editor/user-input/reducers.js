export const setPattern = (state, action) => {
  const { layerType, grid, list } = action.payload;

  return {
    ...state,
    pattern: {
      layerType,
      grid,
      list
    }
  }
}

export const clearPattern = (state, action) => {
  return {
    ...state,
    pattern: {
      layerType: null,
      grid: [],
      list: []
    }
  }
}
