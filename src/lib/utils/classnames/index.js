export const concatClassNames = (arr = []) => {
  let classNamesString = "";

  arr.forEach(className => {
    classNamesString = classNamesString + " " + className;
  });

  return classNamesString
}
