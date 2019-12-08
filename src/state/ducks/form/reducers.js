// import { deleteKeyValuePairFromObject } from 'state/lib/utils';

export const newForm = (state, action) => {
  const { id, data, steps } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        pending: false,
        disabled: true,
        steps,
        stepIndex: 0,
        data
      }
    }
  };
}

export const clearForm = (state, action) => {
  // const { id } = action.payload;

  return state;
}

export const setFieldValue = (state, action) => {
  const { id, stepName, fieldName, fieldValue } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [stepName]: {
            ...state.collection[id].data[stepName],
            [fieldName]: {
              ...state.collection[id].data[stepName][fieldName],
              value: fieldValue
            }
          }
        }
      }
    }
  }
}

export const clearFieldValue = (state, action) => {
  // const { id } = action.payload;

  return state;
}

export const setFieldErrors = (state, action) => {
  const { id, stepName, fieldName, errors } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        data: {
          ...state.collection[id].data,
          [stepName]: {
            ...state.collection[id].data[stepName],
            [fieldName]: {
              ...state.collection[id].data[stepName][fieldName],
              errors
            }
          }
        }
      }
    }
  }
}

export const setFormDisableBoolean = (state, action) => {
  const { id, boolean } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        disabled: boolean
      }
    }
  }
}
