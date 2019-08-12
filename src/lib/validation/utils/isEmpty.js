import isEmpty from 'validator/lib/isEmpty';

export default (str) => {
  return isEmpty(str, { ignore_whitespace: true })
}
