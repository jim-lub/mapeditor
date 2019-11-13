import React from 'react';

import styles from '../navbar.module.css';

export default ({ name, icon: IconComponent, position = 'left',onClick }) => {
  return (
    <div className={"clearfix " + styles.navLinkWrapper} style={{float: position}}>
      <div className={styles.navLink} onClick={onClick}>
        {
          (IconComponent)
            ? <div className={styles.navLinkIconWrapper}><IconComponent className={styles.navLinkIcon} /></div>
            : null
        }
        <div className={styles.navLinkTextWrapper}>{ name }</div>
      </div>
    </div>
  );
}
