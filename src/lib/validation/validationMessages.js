import * as validationTypes from './validationTypes';

export default {
  generic: {
    [ validationTypes.REQUIRED ]: 'Please provide the required field',
    [ validationTypes.MATCH]: 'Field (a) and (b) should match',
    [ validationTypes.INVALID ]: 'The value you have provided is invalid'
  },

  name: {
    'projectName': {
      [ validationTypes.MIN_LENGTH ]: "The project name should have a minimum length of 3 characters",
      [ validationTypes.MAX_LENGTH ]: "The project name should have a maximum length of 30 characters",
    },
    'projectName2': {

    },
    'projectDescription': {
      [ validationTypes.MAX_LENGTH ]: "The project description should have a maximum length of 200 characters"
    },

    'sceneName': {

    },
    'sceneDescription': {

    }
  }
}
