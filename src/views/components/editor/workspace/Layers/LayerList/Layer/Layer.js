import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setActiveLayer,
  toggleLayerVisibility,

  getLayerPropertiesById,
} from 'state/ducks/editor/map';

import { concatClassNames } from 'lib/utils';
import layerConstants from 'lib/constants/layerConstants';

import { ReactComponent as DeleteIcon } from 'assets/static/icons/other/delete.svg';
import { ReactComponent as VisibleIcon } from 'assets/static/icons/other/visible.svg';
import { ReactComponent as InvisibleIcon } from 'assets/static/icons/other/invisible.svg';
import { ReactComponent as WidthIcon } from 'assets/static/icons/other/width.svg';
import { ReactComponent as HeightIcon } from 'assets/static/icons/other/height.svg';

import styles from '../../layers.module.css';

const Component = ({ layerId, layerProperties, isActive, isDragging, openDeleteLayerModal, actions }) => {
  const { name, type, tileSize, visible } = layerProperties;
  const { icon: LayerIcon } = layerConstants[ type ];

  const handleOnLayerClick = (e) => {
    e.stopPropagation();
    if (visible) {
      actions.setActiveLayer({ layerId });
    }
  }

  const handleVisibilityButtonClick = (e) => {
    e.stopPropagation();
    actions.toggleLayerVisibility({ layerId })
  }

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    openDeleteLayerModal({
      layerId,
      layerName: layerProperties.name
    })
  }

  const layerWrapperClassNames = concatClassNames([
    styles.layerWrapper,
    (!visible) ? styles.layerWrapperInvisible : null,
    (visible && isActive) ? styles.layerWrapperActive : null,
    (isDragging) ? styles.layerWrapperDragging : null
  ])

  return (
    <div className={layerWrapperClassNames} onClick={handleOnLayerClick}>
      <div className={styles.layerIconWrapper}><LayerIcon width={16} height={16} /></div>
      <div className={styles.layerNameWrapper}><span style={{fontWeight: "bold"}}>{ name }</span></div>

      <div className={styles.layerToggleVisibilityButton}>
        {
          (visible)
            ? <VisibleIcon className={styles.layerToggleVisibilityIcon} onClick={handleVisibilityButtonClick}/>
            : <InvisibleIcon className={styles.layerToggleVisibilityIcon} onClick={handleVisibilityButtonClick}/>
        }
      </div>

      <div className={styles.layerDeleteLayerButton}>
        <DeleteIcon className={styles.layerDeleteLayerButtonIcon} onClick={handleDeleteButtonClick}/>
      </div>

      <div className={styles.tagWrapper}>
        <div className={styles.tag}>
          <div className={styles.tagIconWrapper}>
            <WidthIcon className={styles.tagIcon}/>
          </div>

          <div className={styles.tagText}>
            { tileSize.width}
          </div>
        </div>

        <div className={styles.tag}>
          <div className={styles.tagIconWrapper}>
            <HeightIcon className={styles.tagIcon}/>
          </div>

          <div className={styles.tagText}>
            { tileSize.height}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, { layerId }) => {
  return {
    layerProperties: getLayerPropertiesById(state, { layerId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setActiveLayer, toggleLayerVisibility }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
