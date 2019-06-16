import * as reducer from './reducers';
import * as selector from './selectors';

const defaultState = {
  authUser: null,
  initialized: false,
  error: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'AUTH_SET_AUTH_USER':
      return reducer.setAuthUser(state, action);
    case 'AUTH_SET_ERROR':
      return reducer.setAuthError(state, action);
    default:
      return state;
  }
}

export const getAuthUserSelector = (state) =>
  selector.getAuthUserSelector(state);

export const getAuthIsInitializedSelector = (state) =>
  selector.getAuthIsInitializedSelector(state);

export const getAuthErrorSelector = (state) =>
  selector.getAuthErrorSelector(state);
