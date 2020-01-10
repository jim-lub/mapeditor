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
              valid: true,
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

export const setFormValid = (state, action) => {
  const { uid, valid } = action.payload;

  return {
    ...state,
    [uid]: {
      ...state[uid],
      meta: {
        ...state[uid].meta,
        valid
      }
    }
  }
}

export const setFieldErrors = (state, action) => {
  const { uid, field, valid, errors } = action.payload;

  return {
    ...state,
    [uid]: {
      ...state[uid],
      fields: {
        ...state[uid].fields,
        [field]: {
          ...state[uid].fields[field],
          errors,
          meta: {
            ...state[uid].fields[field].meta,
            valid
          }
        }
      }
    }
  }
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
      },
      meta: {
        ...state[uid].meta,
        touched: true
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
      },
      meta: {
        ...state[uid].meta,
        touched: true,
        pristine: false
      }
    }
  }
}
