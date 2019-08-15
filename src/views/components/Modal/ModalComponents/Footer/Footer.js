import React from 'react';

import { Button } from '../../Buttons';

import styles from './footer.module.css';

export default ({ disabled = false, onClickAction = null, onSubmit = null, onClose = null }) => {
  const NextButton = () => {
    if (onClickAction) {
      return (
        <Button.Click
          className={styles.buttonSubmit}
          onClick={onClickAction}
          disabled={disabled}
        >
          Confirm
        </Button.Click>
      )
    }

    if (onSubmit) {
      return (
        <Button.Submit
          className={styles.buttonSubmit}
          onClick={onClickAction}
          disabled={disabled}
        >
          Submit
        </Button.Submit>
      )
    }

    return null;
  }

  return (
    <div className={styles.container}>
      <div className={"clearfix " + styles.buttonBox}>
        <Button.Close
          className={styles.buttonClose}
          onClose={onClose}
        >
          Close
        </Button.Close>

        <NextButton />
      </div>
    </div>
  );
};
