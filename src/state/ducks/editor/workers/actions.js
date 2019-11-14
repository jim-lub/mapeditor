import * as types from './types';

export const addTask = ({ data, onComplete }) => ({
  type: types.addTask,
  payload: {
    data,
    onComplete
  }
});

export const removeTask = () => ({
  type: types.removeTask
});
