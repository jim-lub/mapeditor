import React from 'react';

import { Button } from '../../Buttons';

import styles from './footer.module.css';

/**
* a default footer component for modals
* @param {object} buttonLeft object with data for the left button. If no data is found no button will be shown.
* @param {object} buttonRight object with data for the right button. If no data is found no button will be shown.
*/
export default ({ buttonLeft = null, buttonRight = null }) => {
  const ButtonLeft = () => {
    if (buttonLeft) {
      const { text, color, action, disabled } = buttonLeft;

      return (
        <Button.Click color={color} action={action} disabled={disabled}>{ text }</Button.Click>
      )
    }

    return null;
  };

  const ButtonRight = () => {
    if (buttonRight) {
      const { text, color, action, form, disabled } = buttonRight;

      if (action) {
        return (
          <Button.Click color={color} action={action} disabled={disabled}>{ text }</Button.Click>
        )
      }

      if (form) {
        return (
          <Button.Submit color={color} form={form} disabled={disabled}>{ text }</Button.Submit>
        )
      }
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <div className={"clearfix " + styles.buttonBox}>
        <div className={styles.buttonLeft}>
          <ButtonLeft />
        </div>

        <div className={styles.buttonRight}>
          <ButtonRight />
        </div>
      </div>
    </div>
  )
}
