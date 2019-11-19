export const newForm = (state, action) => {
  const { id, schema } = action.payload;

  return {
    ...state,
    collection: {
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

export const setValue = (state, action) => {
  const { id, currentStep, name, value } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [currentStep]: {
            ...state.collection[id].data[currentStep],
            [name]: {
              ...state.collection[id].data[currentStep][name],
              value
            }
          }
        }
      }
    }
  }
}
