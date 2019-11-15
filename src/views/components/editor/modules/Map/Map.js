import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { disableAllEditorInput } from 'state/ducks/editor';
import { getLayerSortOrder } from 'state/ducks/editor/layers';
import { getMapProperties, getMapGrid } from 'state/ducks/editor/map';
import { getZoomScaleModifier } from 'state/ducks/editor/tools';
// import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { Loader } from 'views/components/Loader';

import { Actionbar } from './Actionbar';
import { Grid } from './Grid';
import { Segment } from './Segment';

import styles from './map.module.css';

const Component = ({
  disableAllInput,
  layerSortOrder,
  mapProperties,
  mapGrid,
  zoomScaleModifier,
  contentWidth, contentHeight
}) => {
  return (
    <div className={styles.wrapper} style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.actionbarWrapper}>
        <Actionbar disabled={disableAllInput} />
      </div>

      <div className={styles.contentWrapper}>
        <Grid mapProperties={mapProperties} zoomScaleModifier={zoomScaleModifier}>
          {Segment}
        </Grid>
        { disableAllInput && <Loader.Overlay /> }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    disableAllInput: disableAllEditorInput(state),
    layerSortOrder: getLayerSortOrder(state),
    mapProperties: getMapProperties(state),
    mapGrid: getMapGrid(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
