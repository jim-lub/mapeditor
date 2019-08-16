export default (fieldStateArray) => {
  const fieldHasState = fieldStateArray
    .filter(state => !!state);

  // Initializing state, return error
  if (fieldHasState.length === 0) {
    return ['Initializing state, please wait..'];
  }

  const fieldErrors = fieldHasState
    .map(state => {
      if (state.hasOwnProperty('errors')) {
        return (state.errors.length > 0)
          ? state.errors
          : null;
      }

      return null;
    })
    .filter(state => !!state);

  if (fieldErrors.length > 0) {
    return fieldErrors.reduce((acc, state) => [...acc, ...state]);
  };
  return [];
};
