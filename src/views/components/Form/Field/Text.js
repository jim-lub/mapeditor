import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setFieldTouched,

  getFieldMeta,
  getFieldPlaceholder,
  getFieldValue,
} from 'state/ducks/form';

import { concatClassNames } from 'lib/utils';

import { Row } from '../components/Row';

import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';

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
    onChange({
      field,
      value: e.target.value
    })
  }

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    (meta.touched && meta.valid) ? fieldStyles.valid : null,
    (meta.touched && !meta.valid) ? fieldStyles.invalid : null,
  ]);

  return (
    <div>
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
      <span style={{fontSize: 10, color: 'red'}}>
        { meta.touched ? ' touched ' : ' untouched ' }
        -
        { meta.pristine ? ' pristine ' : ' dirty ' }
        -
        { meta.valid ? ' valid ' : ' invalid ' }
      </span>
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
      setFieldTouched
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

export const Old = ({ name, state = {}, autoFocus = false, onBlur, onChange }) => {
  const [blurred, setBlurred] = useState(false);
  const inputRef = useRef(null);
  const { value = '', fieldLabel, fieldDesc, placeholder, disabled, errors = {} } = state[name];
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus()
    }
  }, [inputRef, autoFocus]);

  const handleBlur = () => {
    setBlurred(true);
    onBlur();
  };

  const handleChange = (e) => {
    onChange({
      name,
      value: e.target.value
    });
  };

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    (hasErrors && blurred) ? fieldStyles.error : null
  ]);

  return (
    <Row
      fieldName={name}
      fieldLabel={fieldLabel}
      fieldDesc={fieldDesc}
      blurred={blurred}
      errors={errors}
    >
      <input
        type="text"
        className={inputClassNames}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={disabled}
        ref={inputRef}
      />

      {
        hasErrors && blurred &&
        <div className={fieldStyles.iconWrapper}>
          <InvalidIcon className={fieldStyles.icon}/>
        </div>
      }

      {
        !hasErrors && blurred &&
        <div className={fieldStyles.iconWrapper}>
          <ValidIcon className={fieldStyles.icon}/>
        </div>
      }
    </Row>
  )

}
