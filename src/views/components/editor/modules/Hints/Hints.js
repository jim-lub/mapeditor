import React, { useState } from 'react';

import hints from 'lib/constants/hints';

import { ReactComponent as NotFoundIcon } from 'assets/static/icons/other/404.svg';

import styles from './hints.module.css';

export default ({ contentWidth, contentHeight }) => {
  const [hintIndex, setHintIndex] = useState(2);
  const { title, message } = hints[hintIndex];

  const handlePrevious = () => {
    const previousHintIndex = hintIndex - 1;
    const previousHint = hints[previousHintIndex];

    if (previousHint) {
      return setHintIndex(previousHintIndex)
    }

    setHintIndex(hints.length - 1);
  }

  const handleNext = () => {
    const nextHintIndex = hintIndex + 1;
    const nextHint = hints[nextHintIndex];

    if (nextHint) {
      return setHintIndex(nextHintIndex)
    }

    setHintIndex(0);
  }

  return (
    <div className={styles.wrapper} style={{width: contentWidth, height: contentHeight}}>
      <div className={"clearfix " + styles.buttonContainer}>
        <button className={styles.button} style={{float: 'left'}} onClick={handlePrevious}>previous</button>
        <button className={"blue " + styles.button} style={{float: 'right'}} onClick={handleNext}>next</button>
      </div>

      <div className={styles.title}>
        { title }
      </div>

      <div className={styles.message}>
        { message }
      </div>
    </div>
  );
}
