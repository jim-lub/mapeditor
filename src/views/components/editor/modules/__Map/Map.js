import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {
  initializeMap,

  getCurrentScene,
  getMapProperties,
  getMapGrid
} from 'state/ducks/editor/map';

import { getLayerSortOrder } from 'state/ducks/editor/layers';
import { getZoomScaleModifier } from 'state/ducks/editor/tools';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';
import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { NoLayersNotification } from 'views/components/Editor/components';
import { Loader } from 'views/components/Loader';
import { Actionbar } from './Actionbar';
import { Segment } from './Segment';

import styles from './map.module.css';

const Component = ({
  initializeMapStatus: { initialized = false, loading = true },
  currentScene, mapProperties, mapGrid,
  layerSortOrder, zoomScaleModifier, disableAllInput,
  contentWidth, contentHeight, actions
}) => {

  useEffect(() => {
    if (!initialized) {
      actions.initializeMap({ sceneId: currentScene.uid })
    }
  }, [initialized, currentScene, actions]);

  if (
    loading || !initialized ||
    !mapProperties || !mapProperties.mapSize || !mapProperties.segmentSize |
    !mapGrid || (mapGrid.length === 0)
  ) {
    return (
      <Loader.Overlay />
    )
  }

  if (layerSortOrder.length === 0 ) {
    return (
      <div style={{width: contentWidth, height: contentHeight, overflow: 'scroll'}}>
        <NoLayersNotification width={contentWidth / 2} height={contentHeight / 2} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper} style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.actionbar}>
        <Actionbar disabled={disableAllInput}/>
      </div>

      <div className={styles.segments}>
        {
          <AutoSizer>
            {({ width, height }) => {
              return (
                <>
                  <FixedSizeGrid
                    columnCount={mapProperties.mapSize.columns}
                    rowCount={mapProperties.mapSize.rows}
                    columnWidth={mapProperties.segmentSize.width * zoomScaleModifier}
                    rowHeight={mapProperties.segmentSize.height * zoomScaleModifier}
                    width={width}
                    height={(height)}
                  >
                    {Segment}
                  </FixedSizeGrid>
                  { disableAllInput && <Loader.Overlay /> }
                </>
              )
            }}
          </AutoSizer>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    initializeMapStatus: getRequestStatus(state, { key: 'initializeMap' }),
    currentScene: getCurrentScene(state),
    mapProperties: getMapProperties(state),
    mapGrid: getMapGrid(state),
    layerSortOrder: getLayerSortOrder(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map }),
    disableAllInput: isAllEditorInputDisabled(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
