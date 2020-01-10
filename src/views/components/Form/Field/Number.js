import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateFieldValue,
  setFieldTouched,

  getFieldMeta,
  getFieldPlaceholder,
  getFieldValue,
} from 'state/ducks/form';

import { concatClassNames } from 'lib/utils';

import { ValidationIndicator } from '../components';

import '../form-default.module.css';
import styles from '../form.module.css';
import fieldStyles from '../form-fields.module.css';

const Component = ({ uid, field, autoFocus, meta, placeholder, value = '', onBlur, onChange, actions }) => {
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

  const handleChange = (e) => {
    const { value } = e.target;

   if (!isNaN(value)) {
     actions.updateFieldValue({
       uid,
       field,
       value: Number(value).toString()
     });

     onChange({ field });
   }
  }

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    (meta.touched && meta.valid) ? fieldStyles.valid : null,
    (meta.touched && !meta.valid) ? fieldStyles.invalid : null,
  ]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={inputClassNames}
        disabled={meta.disabled}
        name={field}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <ValidationIndicator touched={meta.touched} valid={meta.valid} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { uid, field } = ownProps;

  return {
    meta: getFieldMeta(state, { uid, field }),
    placeholder: getFieldPlaceholder(state, { uid, field }),
    value: getFieldValue(state, { uid, field }),
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
