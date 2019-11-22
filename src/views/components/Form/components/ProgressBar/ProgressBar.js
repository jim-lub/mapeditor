import React from 'react';

import { concatClassNames } from 'lib/utils';

import styles from './progress-bar.module.css'

export default ({ currentStep, totalSteps, names = [] }) => {
  const renderSteps = () => {
    return [...new Array(totalSteps)].map((val, index) => {
      const stepClassNames = concatClassNames([
        styles.step,
        (index + 1 < currentStep) ? styles.complete : null,
        (index + 1 === currentStep) ? styles.current : null,
      ]);

      const textClassNames = concatClassNames([
        styles.text,
        (index + 1 < currentStep) ? styles.complete : null,
        (index + 1 === currentStep) ? styles.current : null,
      ]);

      return (
        <div key={index} className={stepClassNames}>
          <div className={textClassNames}>{ names[index] }</div>
        </div>
      )
    })
  }

  return (
    <div className={styles.container}>
      { renderSteps() }
    </div>
  );
}
