import * as types from './types';
import * as reducers from './reducers';
import * as selectors from './selectors';
import * as operations from './operations';

import { createReducer } from 'state/lib/utils';

const defaultState = {
  authUser: null,
  initialized: false,
  error: null
}

export default createReducer( defaultState )({
  [ types.SET_AUTH_USER ]: ( state, action ) =>
    reducers.setAuthUser(state, action),

  [ types.CLEAR_AUTH_USER ]: ( state, action ) =>
    reducers.clearAuthUser(state, action),

  [ types.SET_AUTH_ERROR ]: ( state, action ) =>
    reducers.setAuthError(state, action),

  [ types.CLEAR_AUTH_ERROR ]: ( state, action ) =>
    reducers.clearAuthError(state, action),
});

/*** OPERATIONS ***/
export const listenToAuthChanges = () =>
  operations.listenToAuthChanges();

export const signInWithGoogle = () =>
  operations.signInWithGoogle();

export const signOut = () =>
  operations.signOut();

/*** SELECTORS ***/
export const getAuthUser = ( state ) =>
  selectors.getAuthUser(state);

export const getAuthStatus = ( state ) =>
  selectors.getAuthStatus(state);

export const getAuthError = ( state ) =>
  selectors.getAuthError(state);
