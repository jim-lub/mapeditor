import { deleteKeyValuePairFromObject } from 'state/lib/utils';

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
  const { id, step, name, value } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [step]: {
            ...state.collection[id].data[step],
            [name]: {
              ...state.collection[id].data[step][name],
              value
            }
          }
        }
      }
    }
  }
}

export const clearValue = (state, action) => {
  const { id, step, name } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [step]: {
            ...state.collection[id].data[step],
            [name]: {
              ...state.collection[id].data[step][name],
              value: ''
            }
          }
        }
      }
    }
  }
}

export const setError = (state, action) => {
  const { id, step, name, type, message } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [step]: {
            ...state.collection[id].data[step],
            [name]: {
              ...state.collection[id].data[step][name],
              errors: {
                ...state.collection[id].data[step][name].errors,
                [type]: message
              }
            }
          }
        }
      }
    }
  }
}

export const clearError = (state, action) => {
  const { id, step, name, type } = action.payload;

  if (!state.collection[id].data[step][name].errors) return state;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [step]: {
            ...state.collection[id].data[step],
            [name]: {
              ...state.collection[id].data[step][name],
              errors: {
                ...deleteKeyValuePairFromObject(state.collection[id].data[step][name].errors, type)
              }
            }
          }
        }
      }
    }
  }
}
