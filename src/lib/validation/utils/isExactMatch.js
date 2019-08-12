import equals from 'validator/lib/equals';

export default (str, match) => {
  return equals(str, match) && (match, str);
}
