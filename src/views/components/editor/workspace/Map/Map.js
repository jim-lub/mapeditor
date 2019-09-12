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
  getMapGrid
} from 'state/ducks/editor/map'

import { Loader } from 'views/components/Loader';

import {
  SegmentController,
  CustomScrollbarGridWrapper
} from './components';

const Component = ({ activeSceneId, mapProperties, mapGrid, actions }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!activeSceneId) return setInitialized(true);

    actions.initializeMap({ sceneId: activeSceneId })
      .then(() => setInitialized(true))
      .catch(e => console.error(e));
  }, [activeSceneId, actions]);

  useEffect(() => {

  }, [activeSceneId, mapProperties, actions]);

  const handleSave = () => {
    actions.storeMap({ sceneId: activeSceneId })
  }

  if (!initialized) {
    return <Loader.Simple />
  }

  if (initialized && !activeSceneId) {
    return <div>No scene selected..</div>;
  }

  // return <div>Success</div>;

  return (
    <>
    <AutoSizer>
      {
        ({ width: viewportWidth, height: viewportHeight }) => {
          return (
            <FixedSizeGrid
              columnCount={mapProperties.mapSize.columns}
              rowCount={mapProperties.mapSize.rows}
              columnWidth={mapProperties.segmentSize.width}
              rowHeight={mapProperties.segmentSize.height}
              width={viewportWidth}
              height={viewportHeight}
              outerElementType={CustomScrollbarGridWrapper}
            >
              {SegmentController}
            </FixedSizeGrid>
          )
        }
      }
    </AutoSizer>
    <button style={{position: "absolute", width: 80, left: 40, top: 10 }} className="green" onClick={handleSave}>Save</button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    // activeSceneId: getActiveSceneId(state),
    activeSceneId: "jwTgtS3suxi6gUDwGqHn", // OVERRIDE DEV ONLY

    mapProperties: getMapProperties(state),
    mapGrid: getMapGrid(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeMap, storeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
