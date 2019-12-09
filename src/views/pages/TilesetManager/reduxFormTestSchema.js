import * as validationTypes from 'state/ducks/form/validationTypes';

export const schema = ({ columns }) => ([
  {
    stepName: 'map',
    fields: {
      'name': {
        fieldLabel: 'Name',
        placeholder: 'Choose a name for the map',
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          },
          {
            type: validationTypes.length,
            min: 5,
            max: 50,
            message: 'Value must be between 5 and 50'
          }
        ]
      },

      'columns': {
        fieldLabel: 'Columns',
        fieldDesc: '1-500',
        placeholder: '1- 500',
        validation: [{ type: validationTypes.required }, { type: validationTypes.minValue, value: 1 }, { type: validationTypes.maxValue, value: 500 }]
      },

      'rows': {
        fieldLabel: 'Rows',
        fieldDesc: '1-500',
        placeholder: '1- 500',
        value: 50,
        // validation: [{ type: validationTypes.required }, { type: validationTypes.minValue, value: 1 }, { type: validationTypes.maxValue, value: 500 }],
        disabled: true
      }
    }
  },

  {
    stepName: 'setup',
    fields: {
      'testlabel': {
        fieldLabel: 'Testlabel',
        placeholder: 'Testing the label',
        validation: [{ type: validationTypes.required }]
      },

      'novalidation': {
        fieldLabel: 'No validation',
        placeholder: 'You can leave this empty if you want..',
      },

      'rows': {
        fieldLabel: 'Rows',
        placeholder: 'Again those damn rows..',
        validation: [{ type: validationTypes.required }, { type: validationTypes.minValue, value: 1 }, { type: validationTypes.maxValue, value: 500 }]
      }
    }
  }
]);
