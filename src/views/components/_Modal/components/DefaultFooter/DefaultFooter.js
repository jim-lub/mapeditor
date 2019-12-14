import React from 'react';

import styles from './default-footer.module.css';

export default ({ buttonLeft = null, buttonRight = null }) => {
  const renderLeftButton = () => {
    if (buttonLeft) {
      const {
        text = 'Close',
        action = () => null,
        disabled = false
      } = buttonLeft;

      return (
        <button type="button" onClick={action} disabled={disabled} >
          { text }
        </button>
      )
    }

    return null;
  }

  const renderRightButton = () => {
    if (buttonRight) {
      const {
        text = 'Close',
        action = () => null,
        submit = false,
        disabled = false
      } = buttonRight;

      if (submit) {
        return (
          <button className="blue" type="submit" disabled={disabled} >
            { text }
          </button>
        )
      }

      return (
        <button type="next" onClick={action} disabled={disabled} >
          { text }
        </button>
      )
    }

    return null;
  }

  return (
    <div className={styles.container}>
      <div className={"clearfix " + styles.buttonWrapper}>
        <div className={styles.leftButtonWrapper}>
          { renderLeftButton() }
        </div>

        <div className={styles.rightButtonWrapper}>
          { renderRightButton() }
        </div>
      </div>
    </div>
  )
}
