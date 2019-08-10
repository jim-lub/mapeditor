export default (arr) => {
  let str = "";

  arr.forEach(classname => {
    str += classname + " ";
  });

  return str;
};
