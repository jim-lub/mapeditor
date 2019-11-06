import React from 'react';
import { createSelectable } from 'react-selectable-fast';

import { concatClassNames } from 'lib/utils';

import styles from './tileselector.module.css';

const Component = ({
  selectableRef, selected, selecting,
  tileSize, position,
}) => {
  const selectableClassNames = concatClassNames([
    styles.selectable,
    (selected) ? styles.selected : null,
    (selecting) ? styles.selecting : null,
  ]);

  return (
    <div
      ref={selectableRef}
      className={selectableClassNames}
      style={{ ...tileSize, ...position }}
    >

    </div>
  )
}

export default createSelectable(Component);
