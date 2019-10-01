import React from 'react';

import { concatClassNames } from 'lib/utils';

import layerConstants from 'lib/constants/layerConstants';
import styles from '../../layers.module.css';

export default ({ layerId, layerType, name, isActive, isDragging, onClick, openDeleteLayerModal, toggleLayerVisibility }) => {
  const Icon = layerConstants[layerType].icon;

  const handleClick = () => {
    onClick({ layerId })
  }

  const handleOpenDeleteLayerModal = (e) => {
    e.stopPropagation();
    openDeleteLayerModal({
      layerId,
      layerName: name
    })
  }

  const handleLayerVisibilityToggle = (e) => {
    e.stopPropagation();
    toggleLayerVisibility({ layerId })
  }

  const layerWrapperInnerClassNames = concatClassNames([
    styles.layerWrapperInner,
    (isDragging) ? styles.isDragging : null,
    (!isDragging && isActive) ? styles.isActive : null
  ]);

  return (
    <div className={styles.layerWrapperOuter}>
      <div className={layerWrapperInnerClassNames} onClick={handleClick}>
        <Icon style={{width: 16, height: 16}} />
        <span style={{fontWeight: "bold"}}>{ name }</span><br />

        <button onClick={handleOpenDeleteLayerModal}>Delete</button>
        <button onClick={handleLayerVisibilityToggle}>Visiblity</button>
      </div>
    </div>
  )
}
