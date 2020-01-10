import * as fieldTypes from 'lib/constants/fieldTypes';
import fileConstants from 'lib/constants/fileConstants';
import * as validationTypes from 'lib/constants/validationTypes';

export default () => ({
  type: 'form/SINGLE_STEP',

  steps: [
    {
      name: 'defaults',
      fields: ['file-name', 'file-type', 'file']
    }
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

    'file-name-two': {
      type: fieldTypes.text,
      label: 'File name 2',
      placeholder: 'placeholder 2',
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
        {
          type: validationTypes.matches,
          matchField: 'file-name',
          message: 'Must match file-name'
        },
        {
          type: validationTypes.length,
          min: 5,
          max: 50,
          message: 'Scene name length must be between 5 and 50 characters'
        }
      ]
    },

    'file-name-three': {
      type: fieldTypes.text,
      label: 'File name 3',
      placeholder: 'placeholder 3',
      disabled: true
    },

    // 'file-type': {
    //   label: 'File Type',
    //   options: [
    //     ...Object.entries(fileConstants)
    //       .map(([fileType, { extension }]) => ({
    //         label: extension,
    //         value: fileType
    //       }))
    //   ],
    //   validation: [
    //     {
    //       type: validationTypes.required,
    //       message: 'Field is required'
    //     },
    //   ]
    // },
    //
    // 'file': {
    //   label: 'Choose a file',
    //   placeholder: '',
    //   validation: [
    //     {
    //       type: validationTypes.required,
    //       message: 'Field is required'
    //     },
    //   ]
    // }

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
