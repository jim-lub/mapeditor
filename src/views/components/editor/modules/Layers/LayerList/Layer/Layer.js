import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setActiveLayerId,
  toggleLayerVisibility,
  toggleLayerLock,
  getLayerPropertiesById,
} from 'state/ducks/editor/layers';

import { useContextMenu } from 'lib/hooks';
import { concatClassNames } from 'lib/utils';
import layerConstants from 'lib/constants/layerConstants';

import { ReactComponent as LockedIcon } from 'assets/static/icons/editor/locked.svg';
import { ReactComponent as UnlockedIcon } from 'assets/static/icons/editor/unlocked.svg';
import { ReactComponent as DeleteIcon } from 'assets/static/icons/editor/delete.svg';

import { ReactComponent as VisibleIcon } from 'assets/static/icons/other/visible.svg';
import { ReactComponent as InvisibleIcon } from 'assets/static/icons/other/invisible.svg';
import { ReactComponent as WidthIcon } from 'assets/static/icons/other/width.svg';
import { ReactComponent as HeightIcon } from 'assets/static/icons/other/height.svg';

import styles from '../../layers.module.css';

const Component = ({ layerId, layerProperties, isActive, isDragging, openDeleteLayerModal, actions }) => {
  const [ContextMenu, openContextMenu] = useContextMenu();
  const { layerName, layerType, tileSize, visible, locked } = layerProperties;
  const { icon: LayerIcon } = layerConstants[ layerType ];

  const handleOnLayerClick = (e) => {
    e.stopPropagation();
    if (visible) {
      actions.setActiveLayerId({ layerId });
    }
  }

  const handleToggleVisibilityAction = (e) => {
    e.stopPropagation();
    actions.toggleLayerVisibility({ layerId })
  }

  const handleToggleLockAction = (e) => {
    e.stopPropagation();
    actions.toggleLayerLock({ layerId })
  }

  const handleDeleteAction = (e) => {
    e.stopPropagation();
    openDeleteLayerModal({
      layerId,
      layerName: layerProperties.name
    })
  }

  const handleContextMenu = (e, index) => {
    const items = [
      {
        type: 'item',
        name: (visible) ? 'Hide' : 'Show',
        icon: (visible) ? InvisibleIcon : VisibleIcon,
        action: (e) => handleToggleVisibilityAction(e)
      },
      {
        type: 'item',
        name: (locked) ? 'Unlock' : 'Lock',
        icon: (locked) ? UnlockedIcon : LockedIcon,
        action: (e) => handleToggleLockAction(e)
      },
      { type: 'separator' },
      {
        type: 'item',
        name: 'Delete',
        icon: DeleteIcon,
        action: (e) => handleDeleteAction(e),
      }
    ];

    openContextMenu(e, items);
  }

  const layerWrapperClassNames = concatClassNames([
    styles.layerWrapper,
    (!visible) ? styles.layerWrapperInvisible : null,
    (visible && isActive) ? styles.layerWrapperActive : null,
    (isDragging) ? styles.layerWrapperDragging : null
  ])

  return (
    <>
      <div className={layerWrapperClassNames} onClick={handleOnLayerClick} onContextMenu={handleContextMenu}>
        <div className={styles.layerIconWrapper}><LayerIcon width={16} height={16} /></div>
        <div className={styles.layerNameWrapper}><span style={{fontWeight: "bold"}}>{ layerName }</span></div>

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

      <ContextMenu />
    </>
  )
}

const mapStateToProps = (state, { layerId }) => {
  return {
    layerProperties: getLayerPropertiesById(state, { layerId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setActiveLayerId, toggleLayerVisibility, toggleLayerLock }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
