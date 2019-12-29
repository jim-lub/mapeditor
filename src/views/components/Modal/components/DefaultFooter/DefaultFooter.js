import React from 'react';

import styles from './default-footer.module.css';

export default ({ buttonLeft = () => null, buttonRight = () => null }) => {
  return (
    <div className={styles.container}>
      <div className={"clearfix " + styles.buttonWrapper}>
        <div className={styles.leftButtonWrapper}>
          { buttonLeft() }
        </div>

        <div className={styles.rightButtonWrapper}>
          { buttonRight() }
        </div>
      </div>
    </div>
  )
}
