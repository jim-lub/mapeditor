export const setActiveTool = (state, action) => {
  const { toolType } = action.payload;

  return {
    ...state,
    active: toolType
  }
};

export const setColor = (state, action) => {
  const { hex } = action.payload;

  return {
    ...state,
    colorValue: {
      hex
    }
  }
};
