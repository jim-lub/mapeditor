import { combineReducers } from 'redux';

import auth from './auth';
import editor from './editor';

export default combineReducers ({
  auth,
  editor
})
