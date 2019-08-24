const reduxActionTypes = (actionName) => {
  const actionRequest = actionName + '_REQUEST';
  const actionSuccess = actionName + '_SUCCESS';
  const actionFailure = actionName + '_FAILURE';

  return {
    request: actionRequest,
    success: actionSuccess,
    failure: actionFailure
  }
}

const reduxReducers = () => {

}

const asyncOperation = () => dispatch => {

}

export const _bundler = (actionName, fn) => {
  const actionRequest = actionName + '_REQUEST';
  const actionSuccess = actionName + '_SUCCESS';
  const actionFailure = actionName + '_FAILURE';

  const initialState = {
    data: null,
    loading: false,
    error: null
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionRequest:
        return {
          ...state,
          loading: true
        };

      case actionSuccess:
        return {
          ...state,
          loading: false,
          data: action.data !== undefined ? action.data : null
        };

      case actionFailure:
        return {
          ...state,
          loading: false,
          error: action.error
        };

      default:
        return state;
    }
  };

  const action = function() {
    const args = arguments;

    return dispatch => {
      dispatch({
        type: actionRequest
      })
      try {
        const result = fn.apply(null, args)
        if (typeof result.then === 'function') {
          result.then(data => dispatch({
            type: actionSuccess,
            data
          }))
          .catch(error => dispatch({
            type: actionFailure,
            error
          }))
        } else {
          dispatch({
            type: actionSuccess,
            data: result
          })
        }
      } catch (error) {
        dispatch({
          type: actionFailure,
          error
        })
      }
    }
  };

  return {
    action,
    actionTypes: {
      request: actionRequest,
      success: actionSuccess,
      failure: actionFailure
    },
    reducer
  }
};

const dispatch = () => null;
const combineReducers = () => null;

const [createProjectOperation, createProjectActionTypes, createProjectReducer] = _bundler('createProject', asyncOperation);
const [deleteProjectOperation, deleteProjectActionTypes, deleteProjectReducer] = _bundler('deleteProject', asyncOperation);






createProjectOperation();
dispatch( createProjectActionTypes.success({ collection: [] }) );

combineReducers(createProjectReducer, deleteProjectReducer)









///
