export const getAuthUserSelector = (state) => {
  return state.auth.authUser;
}

export const getAuthIsInitializedSelector = (state) => {
  return state.auth.initialized;
}

export const getAuthErrorSelector = (state) => {
  return state.auth.error;
}
