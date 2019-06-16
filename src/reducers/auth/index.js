import * as reducer from './reducers';
import * as selector from './selectors';

const defaultState = {
  authUser: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'AUTHUSER':
      return reducer.setAuthUser(state, action);
    default:
      return state;
  }
}

export const getAuthUserSelector = (state) =>
  selector.getAuthUserSelector(state);
