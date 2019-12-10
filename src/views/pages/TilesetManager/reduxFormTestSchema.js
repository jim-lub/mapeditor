import * as validationTypes from 'lib/constants/validationTypes';

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
            message: 'Scene name length must be between 5 and 50 characters'
          }
        ]
      },

      'scene-name-confirm': {
        fieldLabel: 'Confirm Scene Name',
        placeholder: 'Choose a name for the map',
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          },
          {
            type: validationTypes.matches,
            stepName: 'map',
            fieldName: 'scene-name',
            message: 'Field should match with `Scene Name`'
          }
        ]
      },

      'scene-description': {
        fieldLabel: 'Scene Description',
        placeholder: 'description',
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          }
        ]
      },

      'scene-presets': {
        fieldLabel: 'Scene Presets',
        options: [
          { label: 'Default #1', value: 'default_1' },
          { label: 'Default #2', value: 'default_2' },
          { label: 'Default #3', value: 'default_3' },
          { label: 'Custom #1', value: 'custom_1' },
          { label: 'Custom #2', value: 'custom_2' },
        ],
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          },
        ]
      },

      'columns': {
        fieldLabel: 'Columns',
        fieldDesc: '1-50',
        placeholder: '1- 50',
        validation: [
          {
            type: validationTypes.minValue,
            minValue: 1,
          },
          {
            type: validationTypes.maxValue,
            maxValue: 50,
          }
        ]
      },

      'rows': {
        fieldLabel: 'Rows',
        fieldDesc: '1-50',
        placeholder: '1- 50',
      },

      'hidden': {
        fieldLabel: 'Hidden',
        placeholder: '',
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          }
        ]
      },
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
        validation: [{ type: validationTypes.required }, { type: validationTypes.minValue, minValue: 1 }, { type: validationTypes.maxValue, maxValue: 500 }]
      }
    }
  }
]);
