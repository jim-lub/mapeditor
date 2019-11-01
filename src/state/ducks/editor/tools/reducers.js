export const setCurrentTool = (state, action) => {
  const { toolType } = action.payload;

  return {
    ...state,
    currentTool: toolType
  }
};

export const setZoomScaleModifier = (state, action) => {
  const { value } = action.payload;

  return {
    ...state,
    zoomScaleModifier: value
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

export const setTileValue = (state, action) => {
  const { value } = action.payload;

  return {
    ...state,
    tileValue: value
  }
};
