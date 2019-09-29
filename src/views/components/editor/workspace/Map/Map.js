import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';

import {
  initializeMap,
  storeMap,
  getCurrentScene,
  getMapProperties,
  getMapGrid,
  getDisableAllInput,
  getStatusMessage
} from 'state/ducks/editor/map'

import { Loader } from 'views/components/Loader';
import { Segment } from './Segment';
import { MapGridCustomScrollbar } from './components';

import styles from './map.module.css';

const Component = ({ currentScene, mapProperties, mapGrid, disableAllInput, statusMessage, actions }) => {

  useEffect(() => {
    if (!currentScene.initialized) {
      actions.initializeMap({ sceneId: currentScene.uid })
    }
  }, [currentScene, actions]);

  if (!currentScene.initialized) {
    return (
      <div>
        <Loader.Simple />
        { statusMessage.content }
      </div>
    )
  }

  if (currentScene.initialized && !currentScene.uid) {
    return <div>No scene selected..</div>;
  }

  if (!mapProperties && !mapGrid) {
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
                columnWidth={mapProperties.segmentSize.width}
                rowHeight={mapProperties.segmentSize.height}
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
                  <div className={styles.disabledInputOverlayStatusMessage}>{ statusMessage.content }</div>
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
    currentScene: getCurrentScene(state),
    mapProperties: getMapProperties(state),
    mapGrid: getMapGrid(state),
    disableAllInput: getDisableAllInput(state),
    statusMessage: getStatusMessage(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeMap, storeMap}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
