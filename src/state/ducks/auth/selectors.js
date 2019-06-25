export const getAuthUser = (state) => {
  return state.auth.authUser;
}

export const getAuthStatus = (state) => {
  return state.auth.initialized;
}

export const getAuthError = (state) => {
  return state.auth.error;
}
