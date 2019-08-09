import validator from 'validator';
// import {
//   isBoolean, isRequired, minValue, maxValue,
// } from 'lib/validation';

const { isEmpty, isLength, isIn } = validator;

export default {
  type: {

  },
  name: {
    'projectName': {
      required: (value) => !isEmpty(value, { ignore_whitespace: true }),
      minLength: (value) => isLength(value, { min: 3 }),
      maxLength: (value) => isLength(value, { max: 30 }),
    },
    'projectDescription': {
      maxLength: (value) => isLength(value, { max: 200 })
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
