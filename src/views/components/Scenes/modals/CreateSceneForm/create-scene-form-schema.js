import * as fieldTypes from 'lib/constants/fieldTypes';
import * as validationTypes from 'lib/constants/validationTypes';

export default () => ([
  {
    stepName: 'defaults',
    fields: {
      'scene-name': {
        fieldType: fieldTypes.text,
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
        fieldType: fieldTypes.textarea,
        fieldLabel: 'Scene description',
        placeholder: 'Description',
      },
    }
  },

  {
    stepName: 'presets',
    fields: {
      'segment-size': {
        fieldType: fieldTypes.select,
        fieldLabel: 'Segment size',
        options: [
          { label: '512 x 512px', value: 512 }
        ],
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          },
        ]
      },

      'columns': {
        fieldType: fieldTypes.number,
        fieldLabel: 'Columns',
        value: 1,
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
        fieldType: fieldTypes.number,
        fieldLabel: 'Rows',
        value: 1,
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
