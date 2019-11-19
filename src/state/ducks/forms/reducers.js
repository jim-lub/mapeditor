export const newForm = (state, action) => {
  const { id, schema } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [id]: {
        initialized: true,
        pending: false,
        errors: [],
        data: {
          ...schema
        }
      }
    }
  }
}

export const updateForm = (state, action) => {
  const { id, currentStep, name, value } = action.payload;

  return {
    ...state,
    data: {
      ...state.data,
      [id]: {
        ...state.data[id],
        data: {
          ...state.data[id].data,
          [currentStep]: {
            ...state.data[id].data[currentStep],
            [name]: {
              ...state.data[id].data[currentStep][name],
              value
            }
          }
        }
      }
    }
  }
}

export const deleteForm = (state, action) => {
  const { id } = action.payload;

  return {
    ...state
  }
}
