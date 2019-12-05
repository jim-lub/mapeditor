import { deleteKeyValuePairFromObject } from 'state/lib/utils';

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
        currentStep: 1,
        totalSteps: steps.length,
        data
      }
    }
  };
}

export const clearForm = (state, action) => {
  const { id } = action.payload;

  return state;
}

export const setFieldValue = (state, action) => {
  const { id } = action.payload;

  return state;
}

export const clearFieldValue = (state, action) => {
  const { id } = action.payload;

  return state;
}

export const setFieldErrors = (state, action) => {
  const { id } = action.payload;

  return state;
}

export const setFormDisableBoolean = (state, action) => {
  const { id } = action.payload;

  return state;
}

// export const newForm = (state, action) => {
//   const { id, schema } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.data,
//       [id]: {
//         initialized: true,
//         pending: false,
//         disabled: true,
//         errors: [],
//         data: {
//           ...schema
//         }
//       }
//     }
//   }
// }
//
// export const setValue = (state, action) => {
//   const { id, step, name, value } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         ...state.collection[id],
//         data: {
//           ...state.collection[id].data,
//           [step]: {
//             ...state.collection[id].data[step],
//             [name]: {
//               ...state.collection[id].data[step][name],
//               value
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// export const clearValue = (state, action) => {
//   const { id, step, name } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         ...state.collection[id],
//         data: {
//           ...state.collection[id].data,
//           [step]: {
//             ...state.collection[id].data[step],
//             [name]: {
//               ...state.collection[id].data[step][name],
//               value: ''
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// export const setError = (state, action) => {
//   const { id, step, name, type, message } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         ...state.collection[id],
//         data: {
//           ...state.collection[id].data,
//           [step]: {
//             ...state.collection[id].data[step],
//             [name]: {
//               ...state.collection[id].data[step][name],
//               errors: {
//                 ...state.collection[id].data[step][name].errors,
//                 [type]: message
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// export const clearError = (state, action) => {
//   const { id, step, name, type } = action.payload;
//
//   if (!state.collection[id].data[step][name].errors) return state;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         ...state.collection[id],
//         data: {
//           ...state.collection[id].data,
//           [step]: {
//             ...state.collection[id].data[step],
//             [name]: {
//               ...state.collection[id].data[step][name],
//               errors: {
//                 ...deleteKeyValuePairFromObject(state.collection[id].data[step][name].errors, type)
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// export const enableFormSubmit = (state, action) => {
//   const { id } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         ...state.collection[id],
//         disabled: false
//       }
//     }
//   }
// }
//
// export const disableFormSubmit = (state, action) => {
//   const { id } = action.payload;
//
//   return {
//     ...state,
//     collection: {
//       ...state.collection,
//       [id]: {
//         ...state.collection[id],
//         disabled: true
//       }
//     }
//   }
// }
