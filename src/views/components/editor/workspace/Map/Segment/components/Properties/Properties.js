import React from 'react';

import styles from '../../segment.module.css';

export default ({ initialized, modified }) => {
  return (
    <div className={styles.propertiesWrapper}>
      <div className={styles.propertiesNode}>
        <span style={{fontWeight: "bold"}}>Initialized:</span> { (initialized ? initialized.toString() : "null") }
      </div>

      <div className={styles.propertiesNode}>
        <span style={{fontWeight: "bold"}}>Modified:</span> { (modified ? modified.toString() : "null") }
      </div>
    </div>
  );
}
