import { useState, useEffect } from 'react';

import validateFieldRulesByName from './validateFieldRulesByName';
import getValidationMessageByName from './getValidationMessageByName';

import { isEmpty, isExactMatch } from './utils';

import * as validationTypes from './validationTypes';

export default ({ initialValue = '', type, name: fieldName, match, required }) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // validate field value; required -> match -> custom rules
  useEffect(() => {
    if (required && isEmpty(value)) {
      setErrors([{
        fieldName: fieldName,
        value: [value],
        error: validationTypes.REQUIRED
      }]);

      return;
    }

    if (match && !isExactMatch(value, match)) {
      setErrors([{
        fieldName: fieldName,
        value: [value, match],
        error: validationTypes.MATCH
      }]);

      return;
    }

    const fieldNameValidation = validateFieldRulesByName(fieldName, value);
    if (fieldName && fieldNameValidation) {
      return setErrors(fieldNameValidation.errors);
    }

    setErrors([]);
  }, [value, type, fieldName, match, required]);

  // get error message
  useEffect(() => {
    const findErrorMessageByName = errors.map((obj) =>
      ({
        fieldName: obj.fieldName,
        value: obj.value,
        error: obj.error,
        message: getValidationMessageByName(fieldName, obj.error)
      })
    );

    if (findErrorMessageByName) {
      setErrorMessages(findErrorMessageByName);
    }
  }, [fieldName, errors]);

  return [value, setValue, errorMessages];
};
