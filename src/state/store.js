import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import * as reducers from './ducks';

export default function configureStore( initialState = {} ) {
    const rootReducer = combineReducers( reducers );

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            logger,
        ),
    );
}
