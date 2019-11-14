import functions from './functions';

import types from './tasks.types';

const tasks = [];
const completedTasks = [];

const state = {
  running: false,
  tasks: [],
  completedTasks: []
}

const config = {
  batchSize: {
    tasks: 5,
  }
}

//eslint-disable-next-line
self.addEventListener("message", ({ data }) => {
  state.tasks.push( data );

  if (!state.running) {
    setTimeout(
      controller,
      0
    )
    state.running = true;
  }
});

const controller = () => {
  const tasks = runTasks();

  const run = () => {
    const result = tasks.next();

    while (state.completedTasks.length > 0) {
      const result = state.completedTasks.shift();
      postMessage(result);
    }

    if (!result.done) {
      setTimeout(run, 50);
    }

    if (result.done) {
      state.running = false;
    }
  }

  setTimeout(run, 50);
}

function *runTasks() {
  let i = 0;

  while (state.tasks.length > 0) {
    const { fn, data } = state.tasks.shift();

    const result = functions[fn]( data );
    state.completedTasks.push( result );

    if (++i > config.batchSize.tasks) {
      yield 1;
      i = 0
    }
  }
}
