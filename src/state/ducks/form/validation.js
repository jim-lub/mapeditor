import isEmptyValidator from 'validator/lib/isEmpty';
import isLengthValidator from 'validator/lib/isLength';
import equalsValidator from 'validator/lib/equals';

export default {
  'required': (value) => isRequired(value),
  'matches': (value, match) => isExactMatch(value, match),
  'length': (value, { min, max }) => isLength(value, { min, max }),
  'boolean': (value) => isBoolean(value),
  'number': (value) => isNumber(value)
}

export const isRequired = (value) => isEmptyValidator(value, { ignore_whitespace: true });

export const isExactMatch = (value, match) => equalsValidator(value, match) && (match, value);

export const isLength = (value, { min = 0, max = undefined }) => !isLengthValidator(value, { min, max });

export const isBoolean = (value) => (typeof value === 'boolean');

export const isNumber = (value) => {
  if (typeof value !== 'number') return false;
  if (value !== Number(value)) return false;
  if (value !== Number(value)) return false;
  if (Number.isFinite(value) === false) return false;

  return true;
}
