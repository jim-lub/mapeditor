import workerTasks from './tasks';

const state = {
  running: false,
  tasks: [],
  completedTasks: []
}

const config = {
  batchSize: 5
}

//eslint-disable-next-line
self.addEventListener("message", ({ data }) => {
  state.tasks.push( data );

  if (!state.running) {
    setTimeout(controller, 0)
    state.running = true;
  }
});

const controller = () => {
  const tasks = runTasks();

  const run = () => {
    const result = tasks.next();

    while (state.completedTasks.length > 0) {
      const result = state.completedTasks.shift();
      postMessage(result)
    }

    if (!result.done) {
      setTimeout(run, 0);
    }

    if (result.done) {
      state.running = false;
    }
  }

  setTimeout(run, 0);
}

function *runTasks() {
  let i = 0;

  while (state.tasks.length > 0) {
    const { key, taskType, reduxActionType, payload } = state.tasks.shift();
    const fn = workerTasks[taskType];

    const result = (typeof fn === "function") ? fn(payload) : null;

    if (!result) {
      state.completedTasks.push({
        key,
        error: {
          type: 'no-function',
          message: 'Provided `functionName` does not match any worker function.'
        }
      });
    }

    if (result) {
      const { updateReduxStore, payload } = result;

      state.completedTasks.push({
        key,
        result: {
          updateReduxStore,
          reduxActionType,
          payload
        }
       })
    }

    if (++i > config.batchSize) {
      yield;
      i = 0
    }
  }
}
