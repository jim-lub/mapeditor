import React from 'react';

import { concatClassNames } from 'lib/utils';

import layerConstants from 'lib/constants/layerConstants';
import styles from '../../layers.module.css';

export default ({ layerId, layerType, name, isActive, isDragging, onClick }) => {
  const handleClick = () => {
    onClick({ layerId })
  }

  const layerWrapperInnerClassNames = concatClassNames([
    styles.layerWrapperInner,
    (isDragging) ? styles.isDragging : null,
    (!isDragging && isActive) ? styles.isActive : null
  ]);

  return (
    <div className={styles.layerWrapperOuter}>
      <div className={layerWrapperInnerClassNames} onClick={handleClick}>
        <span style={{fontWeight: "bold"}}>{ name }</span><br />
        { layerConstants[layerType].name }
      </div>
    </div>
  )
}
