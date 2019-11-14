import _ from 'lodash';

const queue = [];

//eslint-disable-next-line
self.addEventListener("message", ({ data }) => {
  queue.push({ data });
});

const fn = ({ data: { segmentId } }) => {
  return ({
    segmentId,
    worked: true
  })
}

const runTask = () => {
  if (queue.length === 0) return;

  const task = queue.shift();
  const deferred = fn( task.data );
  finishedTask(deferred)
}

const finishedTask = (task) => {
  //eslint-disable-next-line
  self.postMessage({ length: queue.length, task })
}


setInterval(
  runTask,
  10
)
