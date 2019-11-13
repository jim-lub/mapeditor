import React, { forwardRef } from 'react';

import styles from '../../segment.module.css';

export default forwardRef(({ canvasWidth, canvasHeight }, ref) => {
  return (
    <div className={styles.canvasWrapper}>
      <canvas
        ref={ref}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
})
