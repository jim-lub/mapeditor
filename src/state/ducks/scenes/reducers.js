export const setScenes = (state, action) => {
  const { scenes } = action.payload;

  return {
    ...state,
    scenes
  };
}
