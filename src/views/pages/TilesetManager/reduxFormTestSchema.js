import * as validationTypes from 'state/ducks/form/validationTypes';

export const schema = () => ([
  {
    stepName: 'Map',
    fields: {
      'name': {
        fieldLabel: 'Map name',
        placeholder: 'Choose a name for the map',
        validation: [{ type: validationTypes.required }, { type: validationTypes.length, min: 5, max: 50 }]
      },

      'columns': {
        fieldLabel: 'Columns',
        placeholder: '1- 500',
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
    stepName: 'Setup',
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


export default ({ columns }) => ({
  // first step
  1: {
    'columns': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Columns*',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        },
        {
          type: 'length', min: 5, max: 20,
          message: 'Value must be between 1 and 50.'
        }
      ]
    },
    'rows': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Rows*',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        }
      ]
    }
  },

  // second step
  2: {
    'columns': {
      value: columns,
      placeholder: '1 - 50',
      label: 'Columns* 2',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        },
        {
          type: 'length', min: 5, max: 20,
          message: 'Value must be between 1 and 50.'
        }
      ]
    },
    'rows': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Rows* 2',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        }
      ]
    }
  },

  // second step
  3: {
    'columns': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Columns* 3',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        },
        {
          type: 'length', min: 5, max: 20,
          message: 'Value must be between 1 and 50.'
        }
      ]
    },
    'rows': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Rows* 3',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        }
      ]
    }
  },

  4: {
    'columns': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Columns* 4',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        },
        {
          type: 'length', min: 5, max: 20,
          message: 'Value must be between 1 and 50.'
        }
      ]
    },
    'rows': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Rows* 4',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        }
      ]
    }
  },

  // second step
  5: {
    'columns': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Columns* 5',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        },
        {
          type: 'length', min: 5, max: 20,
          message: 'Value must be between 1 and 50.'
        }
      ]
    },
    'rows': {
      value: undefined,
      placeholder: '1 - 50',
      label: 'Rows* 5',
      validation: [
        {
          type: 'required',
          message: 'Field is required!'
        }
      ]
    }
  },

})
