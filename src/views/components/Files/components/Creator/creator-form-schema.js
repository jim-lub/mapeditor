import * as validationTypes from 'lib/constants/validationTypes';
import fileConstants from 'lib/constants/fileConstants';

export default () => ([
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
        fieldLabel: 'Layer Type',
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
    }
  }
]);
