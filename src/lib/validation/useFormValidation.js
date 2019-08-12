import { useState, useEffect } from 'react';

import validateFieldRulesByType from './validateFieldRulesByType';
import validateFieldRulesByName from './validateFieldRulesByName';

import getGenericValidationMessage from './getGenericValidationMessage';
import getValidationMessageByType from './getValidationMessageByType';
import getValidationMessageByName from './getValidationMessageByName';

import { isEmpty, isExactMatch } from './utils';

import * as errorTypes from './errorTypes';

export default ({ initialValue = null, type, name, match, required }) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (required && isEmpty(value)) {
      setError([{
        fieldType: type,
        fieldName: name,
        fieldTypeError: false,
        fieldNameError: false,
        error: errorTypes.IS_REQUIRED,
        value: [value]
      }]);

      return;
    }

    if (match && !isExactMatch(value, match)) {
      setError([{
        fieldType: type,
        fieldName: name,
        fieldTypeError: false,
        fieldNameError: false,
        error: errorTypes.NO_MATCH,
        value: [value, match]
      }]);

      return;
    };

    // const fieldTypeValidation = validateFieldRulesByType(type);
    // if (type && fieldTypeValidation.errors) {
    //   return setError(fieldTypeValidation.errors);
    // };
    //
    // const fieldNameValidation = validateFieldRulesByName(name);
    // if (name && fieldNameValidation.errors) {
    //   return setError(fieldNameValidation.errors);
    // };

    setError([]);
  }, [value, type, name, match, required]);

  useEffect(() => {
    console.log(error);
  }, [error])

  // useEffect(() => {
  //   const errorMessagesArr = error.map((error) => {
  //     const typeErrorMessage = getValidationMessageByType(error.type, error.short_name);
  //     if (typeErrorMessage) {
  //       return typeErrorMessage;
  //     };
  //
  //     const nameErrorMessage = getValidationMessageByName(error.name, error);
  //     if (nameErrorMessage) {
  //       return nameErrorMessage;
  //     };
  //
  //     return getGenericValidationMessage(error);
  //   });
  //
  //
  //   setErrorMessages(errorMessagesArr);
  // }, [error]);

  return [value, setValue, errorMessages];
}
