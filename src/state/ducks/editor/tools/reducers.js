export const setActiveTool = (state, action) => {
  const { toolType } = action.payload;

  return {
    ...state,
    active: toolType
  }
};
