import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';

import {
  initializeMap,
  getCurrentScene,
  getMapProperties,
  getMapGrid
} from 'state/ducks/editor/map';
import { getZoomScaleModifier } from 'state/ducks/editor/tools';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';
import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import { Loader } from 'views/components/Loader';
import { Segment } from './Segment';
import { MapGridCustomScrollbar } from './components';

import styles from './map.module.css';

const Component = ({ activeSceneId, currentScene, mapProperties, mapGrid, zoomScaleModifier, disableAllInput, initializeMapStatus: { initialized = false, loading = false }, actions }) => {

  useEffect(() => {
    if (!initialized) {
      actions.initializeMap({ sceneId: currentScene.uid })
    }
  }, [initialized, currentScene, actions]);

  if (loading) {
    return (
      <div>
        <Loader.Simple />
      </div>
    )
  }

  if (currentScene.initialized || !currentScene.uid) {
    return <div>No scene selected..</div>;
  }

  if (!mapProperties || !mapGrid || (mapGrid.length === 0)) {
    return <div>Something went wrong..</div>;
  }

  return (
    <>
    <AutoSizer>
      {
        ({ width: viewportWidth, height: viewportHeight }) => {
          return (
            <>
              <FixedSizeGrid
                columnCount={mapProperties.mapSize.columns}
                rowCount={mapProperties.mapSize.rows}
                columnWidth={mapProperties.segmentSize.width * zoomScaleModifier}
                rowHeight={mapProperties.segmentSize.height * zoomScaleModifier}
                width={viewportWidth}
                height={viewportHeight}
                outerElementType={MapGridCustomScrollbar}
              >
                {Segment}
              </FixedSizeGrid>

              {
                disableAllInput &&
                <div className={styles.disabledInputOverlay} style={{width: viewportWidth, height: viewportHeight}}>
                  <div
                    style={{
                      marginLeft: (viewportWidth / 2 - 24),
                      marginTop: (viewportHeight / 2 - 24)
                    }}
                  >
                    <Loader.Simple width={48} height={48}/>
                  </div>
                  <div className={styles.disabledInputOverlayStatusMessage}></div>
                </div>
              }
            </>
          )
        }
      }
    </AutoSizer>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    initializeMapStatus: getRequestStatus(state, { key: 'initializeMap' }),
    currentScene: getCurrentScene(state),
    mapProperties: getMapProperties(state),
    mapGrid: getMapGrid(state),
    zoomScaleModifier: getZoomScaleModifier(state),
    disableAllInput: isAllEditorInputDisabled(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
