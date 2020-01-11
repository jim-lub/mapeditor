import * as fieldTypes from 'lib/constants/fieldTypes';
import * as validationTypes from 'lib/constants/validationTypes';

export default () => ({
  type: 'form/SINGLE_STEP',

  fields: {

    'scene-name': {
      type: fieldTypes.text,
      label: 'Scene name',
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
          message: 'Length must be between 5 and 50 characters'
        }
      ]
    },

    'scene-description': {
      type: fieldTypes.textarea,
      label: 'Scene description',
      placeholder: 'Description',
    },

    'segment-size': {
      type: fieldTypes.select,
      label: 'Segment size',
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
      type: fieldTypes.number,
      label: 'Columns, Rows',
      placeholder: '1-50',
      defaultValue: 1,
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
      type: fieldTypes.number,
      label: '__sharelabelwith:columns',
      placeholder: '1-50',
      defaultValue: 1,
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
    }

  }
});
