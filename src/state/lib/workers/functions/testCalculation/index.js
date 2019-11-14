// export default ({ segmentId }) => new Promise((resolve, reject) => {
//   const size = 64;
//   const newArray = [...new Array( size )].map((val, index) => [...new Array( size )].map((val, index) => ({ index })));
//
//   resolve({
//     segmentId,
//     newArray
//   })
// });


export default ({ segmentId }) => {
  const size = 8;
  const newArray = [...new Array( size )].map((val, index) => [...new Array( size )].map((val, index) => ({ index })));

  return { segmentId, newArray }
};
