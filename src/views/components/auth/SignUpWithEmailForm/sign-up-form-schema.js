import * as validationTypes from 'lib/constants/validationTypes';

export default () => ([
  {
    stepName: 'sign-up',
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

      'password-confirm': {
        fieldLabel: 'Confirm',
        placeholder: 'Password',
        validation: [
          {
            type: validationTypes.required,
          },
          {
            type: validationTypes.matches,
            stepName: 'sign-up',
            fieldName: 'password'
          }
        ]
      },
    }
  }
]);
