export default {
  generic: {
    required: 'Please provide the required field',
    invalid: 'The value you have provided is invalid'
  },

  name: {
    projectName: {
      required: 'Please provide a project name',
      rule: {
        minLength: 'Project name must be at least 3 characters long',
        maxLength: 'Project name can\'t be over 30 characters long'
      }
    },
    projectDesc: {
      rule: {
        maxLength: 'Project name can\'t be over 100 characters long'
      }
    }
  }
}
