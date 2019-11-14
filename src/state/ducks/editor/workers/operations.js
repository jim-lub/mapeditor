import * as actions from './actions';
import * as selectors from './selectors';

import { setRequestStatus } from '../requestStatus';

import TasksWorker from 'state/lib/workers/tasks.worker.js';

const tasksWorker = new TasksWorker();

export const controller = () => (dispatch, getState) => {
  tasksWorker.addEventListener('message', ({ data: { segmentId } }) => {
    dispatch( setRequestStatus({ key: `segment-${segmentId}`, type: 'SUCCESS' }) );
  });
  // tasksWorker.addEventListener('message', ({ data: { completedTasks } }) => {
  //   completedTasks.forEach(({ segmentId }, index) => {
  //     console.log('running completed tasks', index, '/', completedTasks.length)
  //     dispatch( setRequestStatus({ key: `segment-${segmentId}`, type: 'SUCCESS' }) );
  //   })
  // });
}

export const addTask = ({ type, fn = null, data = {} }) => dispatch => {
  const { segmentId = 0 } = data;
  dispatch( setRequestStatus({ key: `segment-${segmentId}`, type: 'REQUEST' }) );
  tasksWorker.postMessage({ type, fn, data });
}

export const pullTask = () => {

}
