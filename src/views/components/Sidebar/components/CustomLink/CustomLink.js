import React from 'react';

import styles from '../../sidebar.module.css';

export default ({ name, icon: IconComponent, onClick }) => {
  return (
    <div className={styles.navLinkWrapper} onClick={onClick}>
      <div
        className={styles.navLink}
      >
        {
          (IconComponent)
            ? <IconComponent className={styles.navLinkIcon}/>
            : <div className={styles.tooltip}>{ name }</div>
        }
      </div>
    </div>
  );
}
