export const setAuthUser = (state, action) => {
  const { authUser } = action.payload;

  return {
    ...state,
    authUser,
    initialized: true,
    error: null
  };
}

export const setAuthError = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    error
  };
}
