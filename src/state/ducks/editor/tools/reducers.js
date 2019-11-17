export const setCurrentTool = (state, action) => {
  const { toolType } = action.payload;

  return {
    ...state,
    currentTool: toolType
  }
};

export const setZoomScaleModifier = (state, action) => {
  const { type, value } = action.payload;

  return {
    ...state,
    zoomScaleModifier: {
      ...state.zoomScaleModifier,
      [type]: value
    }
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
