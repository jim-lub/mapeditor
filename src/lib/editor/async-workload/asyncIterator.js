export const asyncIterator = ({ dispatch, func, dataSet = [], batchSize = 50 }) => new Promise((resolve, reject) => {
  const totalOperations = dataSet.length;
  let operationIndex = 0;
  const performOperation = () => {
    if (operationIndex > totalOperations) return;

    let n = operationIndex;

    for (let i = n; i < (n+batchSize); i++) {
      if (operationIndex >= totalOperations) break;

      operationIndex++;
      dispatch(
        func( dataSet[ i ])
      );
    }

    if (operationIndex < totalOperations) {
      window.requestAnimationFrame(performOperation);
    } else {
      resolve();
    }

    console.log('asyncIterator', operationIndex, totalOperations)
  }

  performOperation();
});
