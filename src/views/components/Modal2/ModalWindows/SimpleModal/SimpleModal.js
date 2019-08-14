import React from 'react';

import { concatClassNames } from 'lib/utils';

import styles from './simplemodal.module.css';

export default ({ onClose, children }) => {

  const handleSubmit = () => null;
  const handleClose = (e) => onClose(e);

  const submitButtonClassNames = concatClassNames([
    styles.buttonSubmit,
    "blue"
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        { children }
      </div>

      <div className={styles.buttonBox + " clearfix"}>
        <button
          className={styles.buttonClose}
          onClick={(e) => handleClose(e)}
        >
          Cancel
        </button>

        <button
          className={submitButtonClassNames}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
