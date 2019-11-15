import { setRequestStatus } from '../requestStatus';

import * as taskTypes from './worker/tasks/types';
import TaskWorker from './worker/segments.worker';

const taskWorker = new TaskWorker();

export const listenToTaskWorkerEvents = () => dispatch => {
  taskWorker.addEventListener('message', ({ data: { key, reduxActionType, result, error } }) => {

    if (result) {
      // handle result
      console.log(reduxActionType)
      dispatch( setRequestStatus({ key, type: 'SUCCESS' }) );
    }

    if (error) {
      // handle error
      console.log(error)
    }

  });
}

// privatize this function?
const _sendTaskToWorker = ({ key, taskType, reduxActionType, payload }) => dispatch => {
  dispatch( setRequestStatus({ key, type: 'REQUEST' }) );

  taskWorker.postMessage({
    key,
    taskType,
    reduxActionType,
    payload
  })
}
export const addTaskToWorker = _sendTaskToWorker;
