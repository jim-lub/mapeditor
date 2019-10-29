import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import AutoSizer from 'react-virtualized-auto-sizer';
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

import styles from './map.module.css';

const Component = ({
  initializeMapStatus: { initialized = false, loading = true },
  currentScene, mapProperties, mapGrid,
  zoomScaleModifier, disableAllInput,
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
      <div>
        <Loader.Simple />
      </div>
    )
  }

  return (
    <>
      <FixedSizeGrid
        columnCount={mapProperties.mapSize.columns}
        rowCount={mapProperties.mapSize.rows}
        columnWidth={mapProperties.segmentSize.width * zoomScaleModifier}
        rowHeight={mapProperties.segmentSize.height * zoomScaleModifier}
        width={contentWidth}
        height={contentHeight}
      >
        {Segment}
      </FixedSizeGrid>

      { disableAllInput && <Loader.Overlay /> }
    </>
  );
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
