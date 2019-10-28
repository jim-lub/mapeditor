import React from 'react';

import { concatClassNames } from 'lib/utils';

import styles from '../toolbar.module.css';

export default ({ toolType, name, description, icon: Icon, keybinding, current, onSelect }) => {
  const handleClick = () => {
    onSelect({ toolType });
  }

  const buttonClassNames = concatClassNames([
    styles.button,
    (current) ? styles.current : null
  ]);

  return (
    <button
      className={buttonClassNames}
      onClick={handleClick}
      data-tip={`${name} (${keybinding})`}
      data-for="toolbar-tooltip-handler"
    >
      <Icon className={styles.icon}/>
    </button>
  );
}
