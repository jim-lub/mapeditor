import React from 'react';

import { concatClassNames } from 'lib/utils';
import toolConstants from 'lib/constants/toolConstants';

import styles from './toolbar.module.css';

export default ({ isActive, disabled, toolType, onSelect }) => {
  const { name, description, keybinding, Icon } = toolConstants[ toolType ];

  const nodeClassNames = concatClassNames([
    styles.node,
    (isActive) ? styles.nodeActive : null,
    // (isModifier) ? styles.toolNodeModifier : null
  ]);

  const iconClassNames = concatClassNames([
    styles.nodeIcon,
    (isActive) ? styles.nodeIconActive : null,
    // (isModifier) ? styles.toolNodeIconModifier : null
  ]);

  return (
    <button
      className={nodeClassNames}
      onClick={() => onSelect({ toolType })}
      disabled={disabled}
      data-tip={`${name} (${keybinding})`}
      data-for="toolbar-tooltip-handler"
    >
      <Icon className={iconClassNames}/>
    </button>
  );
}
