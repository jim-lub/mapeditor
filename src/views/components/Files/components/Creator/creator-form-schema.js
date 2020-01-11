import * as fieldTypes from 'lib/constants/fieldTypes';
import fileConstants from 'lib/constants/fileConstants';
import * as validationTypes from 'lib/constants/validationTypes';

export default () => ({
  type: 'form/SINGLE_STEP',

  steps: [
    {
      name: 'defaults',
      fields: ['file-name', 'file-name-width', 'file']
    },
    {
      name: 'presets',
      fields: ['file-name', 'file-type', 'file']
    },
  ],

  fields: {

    'file-name': {
      type: fieldTypes.text,
      label: 'File name',
      placeholder: 'placeholder',
      initialValue: 'test',
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        }
      ]
    },

    'file-name-width': {
      type: fieldTypes.number,
      label: 'Size (w, h)',
      placeholder: '1-5000',
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
        {
          type: validationTypes.minValue,
          minValue: 1
        },
        {
          type: validationTypes.maxValue,
          maxValue: 5000
        }
      ]
    },

    'file-name-height': {
      type: fieldTypes.number,
      label: 'Size (w, h)',
      placeholder: '1-5000',
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
        {
          type: validationTypes.minValue,
          minValue: 1
        },
        {
          type: validationTypes.maxValue,
          maxValue: 5000
        }
      ]
    },

    'file-name-three': {
      type: fieldTypes.text,
      label: 'File name 3',
      placeholder: 'placeholder 3',
      disabled: true
    },

    'file-type': {
      type: fieldTypes.select,
      label: 'File Type',
      options: [
        ...Object.entries(fileConstants)
          .map(([fileType, { extension }]) => ({
            label: extension,
            value: fileType
          }))
      ],
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
      ]
    },

    'file': {
      type: fieldTypes.file,
      label: 'Choose a file',
      placeholder: '',
      validation: [
        // {
        //   type: validationTypes.required,
        //   message: 'Field is required'
        // },
      ]
    }

  }
});

export const a = () => ([
  {
    stepName: 'defaults',
    fields: {
      'file-name': {
        fieldLabel: 'File name',
        placeholder: 'name',
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          }
        ]
      },

      'file-type': {
        fieldLabel: 'File Type',
        options: [
          ...Object.entries(fileConstants)
            .map(([fileType, { extension }]) => ({
              label: extension,
              value: fileType
            }))
        ],
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          },
        ]
      },

      'file': {
        fieldLabel: 'Choose a file',
        placeholder: '',
        validation: [
          {
            type: validationTypes.required,
            message: 'Field is required'
          },
        ]
      },
    }
  }
]);
