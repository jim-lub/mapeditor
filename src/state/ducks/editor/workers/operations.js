import * as actions from './actions';
import * as selectors from './selectors';

import { setRequestStatus } from '../requestStatus';

import TasksWorker from 'state/lib/workers/tasks.worker.js';

const tasksWorker = new TasksWorker();

export const controller = () => (dispatch, getState) => {
  tasksWorker.addEventListener('message', ({ data: { key, result } }) => {
    // console.log(key, result)
    dispatch( setRequestStatus({ key, type: 'SUCCESS' }) );
  });
}

export const addTask = ({ key, functionName, payload }) => dispatch => {
  dispatch( setRequestStatus({ key, type: 'REQUEST' }) );
  tasksWorker.postMessage({ key, functionName, payload });
}
