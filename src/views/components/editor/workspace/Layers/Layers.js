import React from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Scrollbars } from 'react-custom-scrollbars';

import { getCurrentScene } from 'state/ducks/editor/map';
import { useModal } from 'lib/hooks';

import {
  CreateLayerModal,
  DeleteLayerModal
} from './Modals';

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';
import { LayerList } from './LayerList';
import { Toolbar } from './Toolbar';

import styles from './layers.module.css';

const Component = ({ currentScene, layerSortOrder }) => {
  const [CreateLayerModalComponent, openCreateLayerModal] = useModal(CreateLayerModal, { width: 300 });
  const [DeleteLayerModalComponent, openDeleteLayerModal] = useModal(DeleteLayerModal, { width: 300 });

  if (!currentScene.uid) return null;

  return (
    <>
      <WorkspaceModuleWrapper moduleName="Layers">
        <div className={styles.listWrapper}>
          <AutoSizer>
            {
              ({ width, height }) => {
                return (
                  <Scrollbars autoHide style={{width, height}}>
                    <LayerList
                      openDeleteLayerModal={openDeleteLayerModal}
                    />
                  </Scrollbars>
                )
              }
            }
          </AutoSizer>
        </div>
        <div className={styles.toolbarWrapper}>
          <Toolbar
            openCreateLayerModal={openCreateLayerModal}
          />
        </div>
      </WorkspaceModuleWrapper>

      <CreateLayerModalComponent />
      <DeleteLayerModalComponent />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    currentScene: getCurrentScene(state)
  }
}

export default connect(mapStateToProps)(Component);
