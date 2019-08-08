export const monitorFieldStateErrors = (fieldStateArr, callback) => {
  const stateArr = fieldStateArr
    .filter(field => field.hasOwnProperty('errors'))
    .filter(field => field.errors.length > 0);

  if (stateArr.length > 0) {
    callback(true);
  } else {
    callback(false);
  }
}
