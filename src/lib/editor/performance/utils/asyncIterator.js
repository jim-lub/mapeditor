export const asyncIterator = ({ func, dataSet, batchSize = 50 }) => new Promise((resolve, reject) => {
  const totalOperations = dataSet.length;
  let operationIndex = 0;

  const performOperation = () => {
    if (operationIndex > totalOperations) return;

    let n = operationIndex;

    for (let i = n; i < (n+batchSize); i++) {
      if (operationIndex >= totalOperations) break;

      operationIndex++;
      func( dataSet[ i ]);
    }
    // console.log(operationIndex, totalOperations)

    if (operationIndex < totalOperations) {
      window.requestAnimationFrame(performOperation);
    } else {
      resolve();
    }
  }

  performOperation();
});
