import React from 'react';

import { concatClassNames } from 'lib/utils';
import toolConstants from 'lib/constants/toolConstants';

import styles from './toolbar.module.css';

export default ({ isActive, isModifier, toolType, onSelect }) => {
  const { name, description, Icon } = toolConstants[ toolType ];

  const nodeClassNames = concatClassNames([
    styles.toolNode,
    (isActive) ? styles.toolNodeActive : null,
    (isModifier) ? styles.toolNodeModifier : null
  ]);

  const iconClassNames = concatClassNames([
    styles.toolNodeIcon,
    (isActive) ? styles.toolNodeIconActive : null,
    (isModifier) ? styles.toolNodeIconModifier : null
  ]);

  return (
    <div
      className={nodeClassNames}
      onClick={() => onSelect({ toolType })}
    >
      <Icon className={iconClassNames}/>
    </div>
  );
}
