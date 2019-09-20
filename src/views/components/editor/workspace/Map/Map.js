import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';

import {
  getActiveSceneId
} from 'state/ducks/editor/scenes';

import {
  initializeMap,
  storeMap,
  getMapProperties,
  getMapGrid,
  getDisableAllInput
} from 'state/ducks/editor/map'

import { Loader } from 'views/components/Loader';
import { Segment } from './Segment';
import { MapGridCustomScrollbar } from './components';

import styles from './map.module.css';

const Component = ({ activeSceneId, mapProperties, mapGrid, disableAllInput, actions }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!activeSceneId) return setInitialized(true);

    actions.initializeMap({ sceneId: activeSceneId })
      .then(() => setInitialized(true))
      .catch(e => console.error(e));
  }, [activeSceneId, actions]);

  useEffect(() => {

  }, [activeSceneId, mapProperties, actions]);

  if (!initialized) {
    return <Loader.Simple />
  }

  if (initialized && !activeSceneId) {
    return <div>No scene selected..</div>;
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
    // activeSceneId: getActiveSceneId(state) || "jwTgtS3suxi6gUDwGqHn",
    // activeSceneId: getActiveSceneId(state) || "y3OXPa0nXk7HR853lm8n",
    // activeSceneId: "jwTgtS3suxi6gUDwGqHn", // OVERRIDE DEV ONLY
    activeSceneId: getActiveSceneId(state),
    mapProperties: getMapProperties(state),
    mapGrid: getMapGrid(state),
    disableAllInput: getDisableAllInput(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeMap, storeMap}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
