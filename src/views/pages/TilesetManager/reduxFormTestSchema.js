import * as validationTypes from 'state/ducks/form/validationTypes';

export const schema = ({ columns }) => ([
  {
    stepName: 'map',
    fields: {
      'project-name': {
        fieldLabel: 'Project Name',
        value: 'SwordQuest',
        disabled: true
      },

      'scene-name': {
        fieldLabel: 'Scene Name',
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

      'scene-presets': {
        fieldLabel: 'Scene Presets',
      },

      'columns': {
        fieldLabel: 'Columns',
        fieldDesc: '1-50',
        placeholder: '1- 50'
      },

      'rows': {
        fieldLabel: 'Rows',
        fieldDesc: '1-50',
        placeholder: '1- 50',
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
