// import { deleteKeyValuePairFromObject } from 'state/lib/utils';

export const newForm = (state, action) => {
  const { uid, type, steps, fields } = action.payload;

  return {
    ...state,
    [uid]: {
      stepIndex: 0,
      type,
      steps,
      fields: Object.entries(fields).reduce((obj, [key, { initialValue = undefined, disabled = false, ...rest }]) => {
        return obj = {
          ...obj,
          [key]: {
            ...rest,
            value: initialValue,
            errors: [],
            meta: {
              touched: false,
              pristine: true,
              valid: false,
              disabled
            }
          }
        }
      }, {}),
      meta: {
        touched: false,
        pristine: true,
        valid: false
      }
    }
  };
}

export const setFieldTouched = (state, action) => {
  const { uid, field } = action.payload;
  return {
    ...state,
    [uid]: {
      ...state[uid],
      fields: {
        ...state[uid].fields,
        [field]: {
          ...state[uid].fields[field],
          meta: {
            ...state[uid].fields[field].meta,
            touched: true
          }
        }
      }
    }
  }
}


export const setFieldValue = (state, action) => {
  const { uid, field, value } = action.payload;
  return {
    ...state,
    [uid]: {
      ...state[uid],
      fields: {
        ...state[uid].fields,
        [field]: {
          ...state[uid].fields[field],
          value,
          meta: {
            ...state[uid].fields[field].meta,
            touched: true,
            pristine: false
          }
        }
      }
    }
  }
}

// export const newForm = (state, action) => {
//   const { id, data, steps } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         pending: false,
//         disabled: true,
//         steps,
//         stepIndex: 0,
//         data
//       }
//     }
//   };
// }

export const clearForm = (state, action) => {
  // const { id } = action.payload;

  return state;
}

export const setFieldValue2 = (state, action) => {
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

export const setStepIndex = (state, action) => {
  const { id, stepIndex } = action.payload;

  return {
    ...state,
    collection: {
      ...state.collection,
      [id]: {
        ...state.collection[id],
        stepIndex
      }
    }
  }
}
