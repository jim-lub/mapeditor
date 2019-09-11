import React from 'react';
import { connect } from 'react-redux';

import styles from './properties.module.css';

import {
  getMapProperties
} from 'state/ducks/editor/map';

const Component = ({ mapProperties }) => {
  if (!mapProperties.mapSize) return null;

  const properties = [
    { key: "Columns", value: mapProperties.mapSize.columns },
    { key: "Rows", value: mapProperties.mapSize.rows },
    { key: "Segment width", value: mapProperties.segmentSize.width },
    { key: "Segment height", value: mapProperties.segmentSize.height },
    { key: "Chunks", value: mapProperties.chunks }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>Properties</div>
        <table className={styles.propertiesList}>
          <tbody>
          {
            properties.map((prop, index) => {
              return (
                <tr key={index} className={styles.node}>
                  <td className={styles.nodeKey}>{ prop.key }</td>
                  <td className={styles.nodeValue}>{ prop.value }</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    mapProperties: getMapProperties(state)
  }
}

export default connect(mapStateToProps)(Component);
