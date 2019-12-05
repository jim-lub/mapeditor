import * as validationTypes from 'state/ducks/form/validationTypes';

export const schema = ({ columns }) => ([
  {
    stepName: 'map',
    fields: {
      'name': {
        fieldLabel: 'Map name',
        placeholder: 'Choose a name for the map',
        validation: [{ type: validationTypes.required }, { type: validationTypes.length, min: 5, max: 50 }]
      },

      'columns': {
        fieldLabel: 'Columns',
        placeholder: '1- 500',
        value: columns,
        validation: [{ type: validationTypes.required }, { type: validationTypes.minValue, value: 1 }, { type: validationTypes.maxValue, value: 500 }]
      },

      'rows': {
        fieldLabel: 'Columns',
        placeholder: '1- 500',
        validation: [{ type: validationTypes.required }, { type: validationTypes.minValue, value: 1 }, { type: validationTypes.maxValue, value: 500 }]
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
