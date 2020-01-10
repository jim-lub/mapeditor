import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

import {
  updateFieldValue,
  setFieldTouched,

  getFieldMeta,
  getFieldPlaceholder,
  getFieldValue,
  getSelectOptions
} from 'state/ducks/form';

import { concatClassNames } from 'lib/utils';

import { ValidationIndicator } from '../components';

import '../form-default.module.css';
import styles from '../form.module.css';
import fieldStyles from '../form-fields.module.css';

const Component = ({ uid, field, autoFocus, meta, placeholder, value = '', options, onBlur, onChange, actions }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [inputRef, autoFocus]);

  const handleBlur = (e) => {
    if (!meta.touched) {
      actions.setFieldTouched({ uid, field });
    }

    onBlur({ field });
  }

  const handleChange = (selectedOption) => {
    actions.updateFieldValue({
      uid,
      field,
      value: selectedOption
    });

    onChange({ field });
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isSelected
          ? '#5cb6f7'
          : (state.isFocused) ? '#c9e9ff' : '#ffffff',
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? 'solid 1px transparent'
        : (meta.touched && !meta.valid)
          ? 'solid 1px #d32f2f'
          : 'solid 1px #bdbdbd',
      outline: 'none',
      boxShadow: state.isFocused ? '0 0 0 2px #5ab0ee' : 'none', // blue-300
      padding: '2px 4px',
      borderRadius: '4px',
      '&:hover': {
        outline: 0,
        border: state.isFocused ? 'solid 1px transparent' : 'solid 1px #bdbdbd',
        boxShadow: 0,
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <Select
        value={value}
        options={options}
        isDisabled={meta.disabled}
        styles={customStyles}
        classNamePrefix={'react-select'}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { uid, field } = ownProps;

  return {
    meta: getFieldMeta(state, { uid, field }),
    placeholder: getFieldPlaceholder(state, { uid, field }),
    value: getFieldValue(state, { uid, field }),
    options: getSelectOptions(state, { uid, field })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      updateFieldValue,
      setFieldTouched
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

// import React, { useState } from 'react';
//
// import { Row } from '../components/Row';
//
// import '../form-default.module.css';
//
// export default ({ name, state = {}, onBlur, onChange }) => {
//   const [blurred, setBlurred] = useState(false);
//   const { value = '', fieldLabel, fieldDesc, options, disabled, errors = {} } = state[name];
//   const hasErrors = Object.keys(errors).length > 0;
//
//   const handleBlur = () => {
//     setBlurred(true);
//     onBlur();
//   };
//
//   const handleChange = (selectedOption) => {
//     onChange({
//       name,
//       value: selectedOption
//     });
//   };
//
//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor:
//         state.isSelected
//           ? '#5cb6f7'
//           : (state.isFocused) ? '#c9e9ff' : '#ffffff',
//     }),
//     control: (provided, state) => ({
//       ...provided,
//       border: state.isFocused
//         ? 'solid 1px transparent'
//         : (blurred && hasErrors)
//           ? 'solid 1px #d32f2f'
//           : 'solid 1px #bdbdbd',
//       outline: 'none',
//       boxShadow: state.isFocused ? '0 0 0 2px #5ab0ee' : 'none', // blue-300
//       padding: '2px 4px',
//       borderRadius: '4px',
//       '&:hover': {
//         outline: 0,
//         border: state.isFocused ? 'solid 1px transparent' : 'solid 1px #bdbdbd',
//         boxShadow: 0,
//       }
//     })
//   }
//
//   return (
//     <Row
//       fieldName={name}
//       fieldLabel={fieldLabel}
//       fieldDesc={fieldDesc}
//       blurred={blurred}
//       errors={errors}
//     >
//       <Select
//         value={value}
//         options={options}
//         isDisabled={disabled}
//         styles={customStyles}
//         classNamePrefix={'react-select'}
//         onBlur={handleBlur}
//         onChange={handleChange}
//       />
//     </Row>
//   )
//
// }
