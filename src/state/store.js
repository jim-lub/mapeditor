import { createStore, applyMiddleware, combineReducers } from 'redux';
import configureStore from 'redux-mock-store';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import * as reducers from './ducks';

const appReducer = combineReducers(reducers);
const logger = createLogger({
  // diff: true,
  collapsed: true
});

const rootReducer = (state, action) => {
  // clear store if authUser === null;
  if (action.type === 'CLEAR_STORE') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default (initialState = {}) => {
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
          thunk,
          logger
      ),
  );
}

export const configureTestStore = (initialState = {}) => {
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
          thunk
      ),
  );
}

export const configureMockStore = (initialState) => {
  return configureStore([thunk])(initialState);
}
