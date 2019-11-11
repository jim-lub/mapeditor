import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Controller } from './components';

import {
  getSegmentId
} from 'state/ducks/editor/map';

import {
  zoomIn,
  resetZoom,
  zoomOut
} from 'state/ducks/editor/tools';

import { useContextMenu } from 'lib/hooks';

import styles from './segment.module.css';

const Component = ({ columnIndex, rowIndex, style, segmentId, actions }) => {
  const [ContextMenu, openContextMenu] = useContextMenu();

  const handleContextMenu = (e) => {
    const items = [
      {
        type: 'item',
        name: 'Zoom in',
        action: () => actions.zoomIn()
      },
      {
        type: 'item',
        name: 'Reset zoom',
        action: () => actions.resetZoom()
      },
      {
        type: 'item',
        name: 'Zoom out',
        action: () => actions.zoomOut()
      }
    ];

    openContextMenu(e, items);
  }

  return (
    <div style={{ ...style }} className={styles.segmentWrapper} onContextMenu={handleContextMenu}>
      { /* segmentId */ }
      <Controller segmentId={segmentId} />
      { /* <ContextMenu width={200}/> */ }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { columnIndex, rowIndex } = ownProps;

  return {
    segmentId: getSegmentId(state, { columnIndex, rowIndex })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ zoomIn, resetZoom, zoomOut}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
