import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import useDebouncedEffect from 'use-debounced-effect';

import {
  initializeForm,
  validateForm,
  validateFields,

  getFormMeta,
  getFormState,
} from 'state/ducks/form';

import { Loader } from 'views/components/Loader';

const Component = ({
  uid,
  schema,
  steps = [],
  meta,
  formState,
  children,
  onSubmit,
  actions
}) => {
  useEffect(() => {
    actions.initializeForm({ uid, schema });
  }, [uid, schema, actions]);

  useEffect(() => {
    actions.validateFields({ uid });
    actions.validateForm({ uid });
  }, [uid, actions]);

  const handleBlur = ({ field }) => {
    // handle blur actions
  }

  const handleChange = ({ field, value }) => {
    actions.validateFields({ uid });
    actions.validateForm({ uid });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(uid)
  }

  if (!formState) {
    return <Loader.Simple />
  }

  return (
    <form id={uid} onSubmit={handleFormSubmit}>
      <span style={{fontWeight: 'bold', color: 'blue'}}>
        { meta.touched ? ' touched ' : ' untouched ' }
        -
        { meta.pristine ? ' pristine ' : ' dirty ' }
        -
        { meta.valid ? ' valid ' : ' invalid ' }
      </span>

      {
        children({
          state: {},
          provided: {
            uid,
            onBlur: handleBlur,
            onChange: handleChange
          },
          submitDisabled: !meta.valid
        })
      }
    </form>
  )
}

const mapStateToProps = (state, { uid }) => {
  return {
    meta: getFormMeta(state, { uid }),
    formState: getFormState(state, { uid })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      initializeForm,
      validateForm,
      validateFields
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
