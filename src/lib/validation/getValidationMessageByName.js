import validationMessages from './validationMessages';
import * as validationTypes from './validationTypes';

export default (fieldName, error) => {
  if (fieldName && error && validationMessages.name.hasOwnProperty(fieldName)) {
    if (validationMessages.name[fieldName].hasOwnProperty(error)) {
      return validationMessages.name[fieldName][error];
    } else if (validationMessages.generic.hasOwnProperty(error)) {
      return validationMessages.generic[error];
    } else {
      return validationMessages.generic[validationTypes.INVALID];
    }
  }

  if (!fieldName && error) {
    if (error === validationTypes.REQUIRED) {
      return validationMessages.generic[validationTypes.REQUIRED];
    } else {
      return validationMessages.generic[validationTypes.INVALID];
    }
  }

  return validationMessages.generic[validationTypes.INVALID];
};
