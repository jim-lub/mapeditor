export const concatClassNames = (arr) => {
  let str = "";

  arr.forEach(classname => {
    str += classname + " ";
  });

  return str;
};
