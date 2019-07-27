export default {
  name: {
    'projectName': {
      minLength: ({ value }) => (value.length >= 3),
      minLength2: ({ value }) => (value.length >= 3),
      minLength3: ({ value }) => (value.length >= 3),
      maxLength: ({ value }) => (value.length <= 30)
    },
    'projectDesc': {
      // matches: ({ value, match }) => (value === match.current.value),
      maxLength: ({ value }) => (value.length <= 100)
    },
    'projectNumber': {
      number: ({ value }) => (!isNaN(value))
    },
    'sceneDesc': {

    }
  }
}
