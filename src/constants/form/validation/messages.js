export default {
  generic: {
    required: 'Please provide the required field',
    invalid: 'The value you have provided is invalid'
  },

  type: {

  },

  name: {
    'projectName': {
      required: "A project name is required",
      minLength: "The project name should have a minimum length of 3 characters",
      maxLength: "The project name should have a maximum length of 30 characters",
    },
    'projectDescription': {
      maxLength: "The project description should have a maximum length of 200 characters"
    },

    'sceneName': {

    },
    'sceneDescription': {

    },
    'scenePresets': {
      isValidOption: "The chosen preset seems to contain an invalid value. Please refresh the form."
    }
  }
}
