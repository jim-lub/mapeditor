export const setAuthUser = (state, action) => {
  const { authUser } = action.payload;

  return {
    ...state,
    authUser,
    initialized: true,
    error: null
  };
}

export const clearAuthUser = (state, action) => {
  return {
    ...state,
    initialized: true,
    authUser: null
  };
}

export const setAuthError = (state, action) => {
  const { form, error } = action.payload;

  return {
    ...state,
    error
  };
}

export const clearAuthError = (state, action) => {
  return {
    ...state,
    error: null
  };
}
