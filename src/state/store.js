import { createStore, applyMiddleware, combineReducers } from 'redux';
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
  // action only dispatched from state/ducks/auth/operations/listenToAuthChanges()
  if (action.type === 'CLEAR_STORE') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default function configureStore( initialState = {} ) {

  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
          thunk,
          // logger
      ),
  );
}
