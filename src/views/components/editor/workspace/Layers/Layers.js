import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Scrollbars } from 'react-custom-scrollbars';

import { useModal } from 'lib/hooks';

import {
  CreateLayerModal,
  DeleteLayerModal
} from './Modals';

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';
import { LayerList } from './LayerList';
import { Toolbar } from './Toolbar';

import styles from './layers.module.css';

export default ({ layerSortOrder }) => {
  const [CreateLayerModalComponent, openCreateLayerModal] = useModal(CreateLayerModal, { width: 300 });
  const [DeleteLayerModalComponent, openDeleteLayerModal] = useModal(DeleteLayerModal, { width: 300 });

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
