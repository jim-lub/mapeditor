import isEmptyValidator from 'validator/lib/isEmpty';
import isLengthValidator from 'validator/lib/isLength';
import equalsValidator from 'validator/lib/equals';

export const required = ({ value, field, ...rest }) => {
  return isEmptyValidator(value + '', { ignore_whitespace: true });
}
export const matches = ({ value, match }) => !equalsValidator(value, match.value) && (match.value, value);
export const length = ({ value, min = 0, max = undefined }) => !isLengthValidator(value, { min, max });
export const minValue = ({ value, minValue }) => value < minValue;
export const maxValue = ({ value, maxValue }) => value > maxValue;

export const number = ({ value }) => (dispatch) => {
  if (typeof value !== 'number') return false;
  if (value !== Number(value)) return false;
  if (value !== Number(value)) return false;
  if (Number.isFinite(value) === false) return false;

  return true;
}
