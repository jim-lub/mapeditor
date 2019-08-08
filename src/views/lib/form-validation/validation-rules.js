export default {
  name: {
    'projectName': {
      minLength: ({ value }) => (value.length >= 3),
      maxLength: ({ value }) => (value.length <= 30)
    },
    'projectDesc': {
      // matches: ({ value, match }) => (value === match),
      maxLength: ({ value }) => (value.length <= 100)
    },
    'projectNumber': {
      number: ({ value }) => (!isNaN(value))
    },
    'sceneDesc': {

    }
  }
}
