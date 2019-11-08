import React from 'react';
import { connect } from 'react-redux';

import { getMapProperties } from 'state/ducks/editor/map';
import { getLayerSortOrder } from 'state/ducks/editor/layers';
import { getZoomScaleModifier } from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import styles from './properties.module.css';

const Component = ({
  contentWidth, contentHeight,
  mapProperties,
  layerSortOrder,
  zoomScaleModifier,
}) => {
  if (!mapProperties.mapSize) return null;

  const properties = [
    ['Columns (segments)', mapProperties.mapSize.columns],
    ['Rows (segments)', mapProperties.mapSize.rows],
    ['Segment size (w, h)', `${mapProperties.segmentSize.width}, ${mapProperties.segmentSize.height}`],

    ['Layers', layerSortOrder.length],

    ['Zoom', `${ zoomScaleModifier * 100 }%`]
  ]

  return (
    <table className={styles.table} style={{width: contentWidth}}>
      <tbody>
        {
          properties.map(([key, value], index) => {
            return (
              <tr key={index} className={styles.row}>
                <td className={styles.key}>{ key }</td>
                <td className={styles.value}>{ value }</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => {
  return {
    mapProperties: getMapProperties(state),
    layerSortOrder: getLayerSortOrder(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map })
  }
}

export default connect(mapStateToProps)(Component);
