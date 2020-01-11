import * as fieldTypes from 'lib/constants/fieldTypes';
import * as validationTypes from 'lib/constants/validationTypes';

export default () => ({
    type: 'form/SINGLE_STEP',

    fields: {
      'email': {
        type: fieldTypes.text,
        label: 'Email',
        placeholder: 'Email',
        validation: [
          {
            type: validationTypes.required,
          }
        ]
      },

      'password': {
        type: fieldTypes.password,
        label: 'Password',
        placeholder: 'Password',
        validation: [
          {
            type: validationTypes.required,
          }
        ]
      },
    }
});
