import * as validationTypes from 'lib/constants/validationTypes';

export default () => ([
  {
    stepName: 'defaults',
    fields: {
      'scene-name': {
        fieldLabel: 'Scene name',
        placeholder: 'Name',
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

      'scene-description': {
        fieldLabel: 'Scene description',
        placeholder: 'Description'
      },
    }
  },

  {
    stepName: 'presets',
    fields: {
      'preset': {
        fieldLabel: 'Preset',
        options: [
          { label: 'DEFAULT #1', value: 'default-1' }
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
    }
  }
]);
