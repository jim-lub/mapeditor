export default {
  // first step
  1: {
    'firstName': {
      value: undefined, // auto replace when passing through redux
      placeholder: '1 - 50',
      label: 'Columns*',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        },
        {
          type: 'length', min: 5, max: 20,
          message: 'Value should be between 1 and 50.'
        }
      ]
    },
    'lastName': {
      value: undefined, // auto replace when passing through redux
      placeholder: 'Last name',
      label: 'Last name',
    }
  },

  // second step
  2: {
    'street': {
      value: undefined, // auto replace when passing through redux
      placeholder: 'Street',
      label: 'Street',
    },
    'city': {
      value: undefined, // auto replace when passing through redux
      placeholder: 'City',
      label: 'City',
    }
  },

  // second step
  3: {
    'hobbies': {
      value: undefined, // auto replace when passing through redux
      placeholder: 'Street',
      label: 'Street',
    },
    'stuff': {
      value: undefined, // auto replace when passing through redux
      placeholder: 'City',
      label: 'City',
    }
  },
}
