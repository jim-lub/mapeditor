export const statusReducer = (name, type, state, error = null) => {
  if (type === 'REQUEST') {
    return {
      status: {
        ...state.status,
        [name]: { loading: true, error: null }
      }
    }
  }

  if (type === 'SUCCESS') {
    return {
      status: {
        ...state.status,
        [name]: { loading: false, error: null }
      }
    }
  }

  if (type === 'FAILURE') {
    return {
      status: {
        ...state.status,
        [name]: { loading: false, error: error }
      }
    }
  }
}
