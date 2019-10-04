export const deleteKeyValuePairFromObject = (objectToRemoveFrom, objectKeyToRemove) => ({
  ...Object.entries(objectToRemoveFrom)
    .reduce((obj, [key, value]) => {
      if (key !== objectKeyToRemove) {
        obj = { ...obj, [key]: value }
      }

      return obj;
    }, {})
});
