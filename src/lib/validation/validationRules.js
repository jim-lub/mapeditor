import validator from 'validator';
// import {
//   isBoolean, isRequired, minValue, maxValue,
// } from 'lib/validation';

import * as validationTypes from './validationTypes';

const { isNumeric, isLength, isIn } = validator;

/***
* @ Validation rules`
* Required and match rules need to be set on the components. Any other rules you
* want to enforce will be handled in this file. You can set rules for a field `type`
* or apply them by `name`. The rules have acces to the fieldvalue prop and an optional
* `options` object. Use destructuring to pull of custom properties where needed
**/
export default {
  name: {
    'projectName': {
      [ validationTypes.MIN_LENGTH ]: (value) => isLength(value, { min: 3 }),
      [ validationTypes.MAX_LENGTH ]: (value) => isLength(value, { max: 30 }),
    },
    'projectDescription': {
      [ validationTypes.MAX_LENGTH ]: (value) => isLength(value, { max: 200 }),
    },

    'sceneName': {

    },
    'sceneDescription': {

    },
    'scenePresets': {
      isValidOption: (value, { options }) => isIn(value, options)
    }
  }
}
