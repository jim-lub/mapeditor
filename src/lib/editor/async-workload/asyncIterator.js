export const asyncIterator = ({ dispatch, operations = [], batchSize = 100 }) => new Promise((resolve, reject) => {
  const totalOperations = operations.length;
  let operationIndex = 0;

  const performOperation = () => {
    if (operationIndex > totalOperations) return;

    let n = operationIndex;

    for (let i = n; i < (n+batchSize); i++) {
      if (operationIndex > totalOperations) break;

      operationIndex++;

      dispatch( operations[ i ] );
    }

    console.log()
    if (operationIndex < totalOperations) {
      window.requestAnimationFrame(performOperation);
    } else {
      resolve();
    }
    console.log('dispatch', operationIndex, totalOperations)

  }

  performOperation();
});


// function heavyLifter() {
//
// 	this.elementsLength = 1000; // Amount of operations
// 	this.currentPosition = 0;   // Current position
//
// 	// Initializer to start the iterator
// 	this.startCalculation = function() {
// 		// Reset current position to zero
// 		this.currentPosition = 0;
// 		// Start looping
// 		setTimeout(
// 			this.calculate.bind(this),
// 			0
// 		);
// 	}
//
//   this.calculate = function(){
// 		// Check that we still have iterations left, otherwise, return
// 		// out of function without calling a new one.
// 		if( this.currentPosition > this.elementsLength ) return;
//
// 		//
// 		// Do computation
// 		//
//
// 		// save currentposition, because we'll alter it
// 		// in the loop
// 		var n = this.currentPosition;
//
// 		// Batch process 50 elements at a time
// 		for( var i = n; i < n+50; i++ ){
// 			// Check that we haven't run out of elements
// 			if( this.currentPosition > this.elementsLength ) break;
// 			// Add to counter
// 			this.currentPosition++;
//
// 			doHeavyLifting( element[ i ] );
// 		}
// 	}

	// this.calculate = function(){
	// 	// Check that we still have iterations left, otherwise, return
	// 	// out of function without calling a new one.
	// 	if( this.currentPosition > this.elementsLength ) return;
	// 	// Do computation
	// 	doHeavyLifting( element[ this.currentPosition ] );
  //
	// 	// Add to counter
	// 	this.currentPosition++;
// 	}
// }
//
// // Initalize the object and start iterating
// var computationIterator = new heavyLifter();
// computationIterator.startCalculation();
//
// /**
//  * Batch processes large datasets with the help of requestAnimationFrame in order
//  * to not lock up the single thread.
//  */
// var asyncIterator2 = (function($) {
// 	/**
// 	 * Runs a callback on a large dataset without holding up the main thread.
// 	 *
// 	 * @param {array}		arr 		The dataset
// 	 * @param {function}	cb 			The callback function
// 	 * @param {int}			batchSize	(Optional) the number of operations per call, default: 10
// 	 */
// 	var AsyncIterator = function(arr, cb, batchSize) {
// 		this.arr = arr;
// 		this.cb = cb;
// 		this.batchSize = parseInt(batchSize) || 10;
// 		this.position = 0;
// 		this.results = [];
//
// 		this._deferred;
// 	}
//
// 	/**
// 	 * Starts the iteration of the dataset
// 	 *
// 	 * @return {Jquery deferred}	A promise that will resolve when operations are done.
// 	 */
// 	AsyncIterator.prototype.process = function() {
// 		this._deferred = new $.Deferred();
//
// 		this._iterate();
//
// 		return this._deferred;
// 	}
//
// 	/**
// 	 * The actual operating part
// 	 * @private
// 	 */
// 	AsyncIterator.prototype._iterate = function() {
// 		for(var i = 0; i  < this.batchSize; i++) {
// 			if(this.position >= this.arr.length) { break; }
//
// 			var currentItem = this.arr[this.position];
//
// 			this.results[this.position] = this.cb(currentItem, this.position);
//
// 			this.position++;
// 		}
//
// 		if(this.position < this.arr.length) {
// 			window.requestAnimationFrame(this._iterate.bind(this));
// 		} else {
// 			this._deferred.resolve(this.results);
// 		}
// 	}
//
// 	/**
// 	 * The public method for creating the AsyncIterator
// 	 *
// 	 * @return {Jquery deferred}	A promise that will resolve when operations are done.
// 	 */
// 	return function(arr, cb, size) {
// 		var it = new AsyncIterator(arr, cb, size);
// 		return it.process();
// 	}
// })(jQuery);
