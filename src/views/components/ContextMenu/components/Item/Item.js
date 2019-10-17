import React from 'react';

import styles from '../../contextmenu.module.css';

export default ({ name, keybinding, icon: Icon, action, onClose }) => {
  const handleClick = (e) => {
    action(e);
    onClose(e)
  }

  return (
    <div className={styles.itemWrapper} onClick={handleClick}>
      {
        (Icon)
          ? <Icon className={styles.itemIcon} />
          : null
      }

      <span className={styles.itemName}>
        { name }
      </span>

      {
        (keybinding)
          ?
            (
            <div className={styles.itemKeybindingWrapper}>
              { keybinding }
            </div>
            )
          : null
      }
    </div>
  );
}
