import React, { useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

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
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)

    actions.updateFieldValue({
      uid,
      field,
      value: {
        localURL: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0]
      }
    });

    onChange({ field });
  //eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleBlur = (e) => {
    if (!meta.touched) {
      actions.setFieldTouched({ uid, field });
    }

    onBlur({ field });
  }

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    fieldStyles.file,
    (meta.touched && meta.valid) ? fieldStyles.valid : null,
    (meta.touched && !meta.valid) ? fieldStyles.invalid : null,
    (isDragActive) ? fieldStyles.isDragging : null,
    (value) ? fieldStyles.hasValue : null
  ]);

  return (
    <div className={styles.wrapper}>
      <div {...getRootProps()} className={inputClassNames}>
        <input {...getInputProps()} onBlur={handleBlur}/>
        {
          value ?
            <div className={styles.filePreview} style={{backgroundImage: `url(${value.localURL})`}}>
              <div className={styles.fileDataOverlay}>{ value.file.name }</div>
            </div>

            : isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop your file here, or click to select a file</p>

        }
      </div>

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

// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone'
//
// import { concatClassNames } from 'lib/utils';
//
// import { Row } from '../components/Row';
//
// import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
// import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';
//
// import '../form-default.module.css';
// import fieldStyles from '../form-fields.module.css';
//
// export default ({ name, state = {}, autoFocus = false, onBlur, onChange }) => {
//   const [blurred, setBlurred] = useState(false);
//
//   const onDrop = useCallback(acceptedFiles => {
//     console.log(acceptedFiles)
//
//     onChange({
//       name,
//       value: {
//         localURL: URL.createObjectURL(acceptedFiles[0]),
//         file: acceptedFiles[0]
//       }
//     });
//   //eslint-disable-next-line
//   }, []);
//
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//   const { fieldLabel, fieldDesc, errors = {} } = state[name];
//   const hasErrors = Object.keys(errors).length > 0;
//
//   const inputClassNames = concatClassNames([
//     fieldStyles.fileInput,
//     (hasErrors && blurred) ? fieldStyles.error : null,
//     (isDragActive) ? fieldStyles.isDragging : null
//   ]);
//
//   return (
//     <Row
//       fieldName={name}
//       fieldLabel={fieldLabel}
//       fieldDesc={fieldDesc}
//       errors={errors}
//     >
//       <div {...getRootProps()} className={inputClassNames}>
//         <input {...getInputProps()} />
//         {
//           isDragActive ?
//             <p>Drop the files here ...</p> :
//             <p>Drag 'n' drop your file here, or click to select a file</p>
//         }
//       </div>
//
//       {
//         hasErrors && blurred &&
//         <div className={fieldStyles.iconWrapper}>
//           <InvalidIcon className={fieldStyles.icon}/>
//         </div>
//       }
//
//       {
//         !hasErrors && blurred &&
//         <div className={fieldStyles.iconWrapper}>
//           <ValidIcon className={fieldStyles.icon}/>
//         </div>
//       }
//     </Row>
//   )
// }
