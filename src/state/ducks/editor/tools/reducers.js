export const setCurrentTool = (state, action) => {
  const { toolType } = action.payload;

  return {
    ...state,
    currentTool: toolType
  }
};

export const setColorValue = (state, action) => {
  const { hex, rgb, hsl } = action.payload;

  return {
    ...state,
    colorValue: {
      hex,
      rgb,
      hsl
    }
  }
};
