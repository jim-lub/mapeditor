import * as validationTypes from 'lib/constants/validationTypes';

export default () => ([
  {
    stepName: 'sign-in',
    fields: {
      'email': {
        fieldLabel: 'Email',
        placeholder: 'Email',
        validation: [
          {
            type: validationTypes.required,
          }
        ]
      },

      'password': {
        fieldLabel: 'Password',
        placeholder: 'Password',
        validation: [
          {
            type: validationTypes.required,
          }
        ]
      },
    }
  }
]);
