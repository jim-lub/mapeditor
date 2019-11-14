export const asyncIterator = ({ fn, dataSet, batchSize = 1, dispatch }) => new Promise((resolve, reject) => {
  const totalOperations = dataSet.length;
  let operationIndex = 0;

  const performOperation = () => {
    if (operationIndex > totalOperations) return;

    let n = operationIndex;

    for (let i = n; i < (n+batchSize); i++) {
      if (operationIndex >= totalOperations) break;

      operationIndex++;

      if (dispatch) {
        dispatch( fn( dataSet[i] ) );
      } else {
        fn( dataSet[ i ]);
      }
    }
    // console.log(operationIndex, totalOperations)

    if (operationIndex < totalOperations) {
      window.requestAnimationFrame(performOperation);
    } else {
      resolve();
    }
  }

  window.requestAnimationFrame(performOperation)
});
