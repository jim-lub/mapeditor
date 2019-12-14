import isEmptyValidator from 'validator/lib/isEmpty';
import isLengthValidator from 'validator/lib/isLength';
import equalsValidator from 'validator/lib/equals';

import * as selectors from './selectors';

export const required = ({ value }) => (dispatch) => {
  switch (typeof value) {
    case 'string':
      return isEmptyValidator(value, { ignore_whitespace: true })

    case 'object':
      return !value.hasOwnProperty('value')
    default:
      return;
  }
}

export const matches = ({ value, id, stepName, fieldName }) => (dispatch, getState) => {
  const match = selectors.getFieldData(getState(), { id, stepName, fieldName });

  return !equalsValidator(value, match.value) && (match.value, value);
}

export const minValue = ({ value, minValue }) => () => value < minValue;
export const maxValue = ({ value, maxValue }) => () => value > maxValue;

export const length = ({ value, min = 0, max = undefined }) =>  () => !isLengthValidator(value, { min, max });

export const number = ({ value }) => (dispatch) => {
  if (typeof value !== 'number') return false;
  if (value !== Number(value)) return false;
  if (value !== Number(value)) return false;
  if (Number.isFinite(value) === false) return false;

  return true;
}
