import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

import { concatClassNames } from 'lib/utils';

import { Row } from '../components/Row';

import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';

import '../form-default.module.css';
import fieldStyles from '../form-fields.module.css';

export default ({ name, state = {}, autoFocus = false, onBlur, onChange }) => {
  const [blurred, setBlurred] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)

    onChange({
      name,
      value: {
        localURL: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0]
      }
    });
  //eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { fieldLabel, fieldDesc, errors = {} } = state[name];
  const hasErrors = Object.keys(errors).length > 0;

  const inputClassNames = concatClassNames([
    fieldStyles.fileInput,
    (hasErrors && blurred) ? fieldStyles.error : null,
    (isDragActive) ? fieldStyles.isDragging : null
  ]);

  return (
    <Row
      fieldName={name}
      fieldLabel={fieldLabel}
      fieldDesc={fieldDesc}
      errors={errors}
    >
      <div {...getRootProps()} className={inputClassNames}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop your file here, or click to select a file</p>
        }
      </div>

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

// export const A = ({ name, state = {}, autoFocus = false, onBlur, onChange }) => {
//   const [blurred, setBlurred] = useState(false);
//   const inputRef = useRef(null);
//   const { fieldLabel, fieldDesc, placeholder, disabled, errors = {} } = state[name];
//   const hasErrors = Object.keys(errors).length > 0;
//
//   useEffect(() => {
//     if (inputRef.current && autoFocus) {
//       inputRef.current.focus()
//     }
//   }, [inputRef, autoFocus]);
//
//   const handleBlur = () => {
//     setBlurred(true);
//     onBlur();
//   };
//
//   const handleChange = (e) => {
//     // console.log(e.target.files[0])
//     onChange({
//       name,
//       value: {
//         localURL: URL.createObjectURL(e.target.files[0]),
//         file: e.target.files[0]
//       }
//     });
//   };
//
//   const inputClassNames = concatClassNames([
//     fieldStyles.input,
//     (hasErrors && blurred) ? fieldStyles.error : null
//   ]);
//
//   return (
//     <Row
//       fieldName={name}
//       fieldLabel={fieldLabel}
//       fieldDesc={fieldDesc}
//       blurred={blurred}
//       errors={errors}
//     >
//       <input
//         type="file"
//         className={inputClassNames}
//         name={name}
//         placeholder={placeholder}
//         onBlur={handleBlur}
//         onChange={handleChange}
//         disabled={disabled}
//         ref={inputRef}
//       />
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
//
// }
