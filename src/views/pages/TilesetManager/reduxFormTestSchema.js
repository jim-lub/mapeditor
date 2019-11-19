export default {
  // first step
  1: {
    'firstName': {
      value: undefined, // auto replace when passing through redux
      placeholder: 'First name',
      label: 'First name',
      validation: [
        { type: 'required' },
        { type: 'minValue', value: 5 }
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
