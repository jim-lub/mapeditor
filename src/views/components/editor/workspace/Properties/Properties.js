import React from 'react';
import { connect } from 'react-redux';

import styles from './properties.module.css';

import {
  getMapProperties
} from 'state/ducks/editor/map';

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';

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
    <WorkspaceModuleWrapper moduleName="Properties" minHeight={145} maxHeight={145}>
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
    </WorkspaceModuleWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    mapProperties: getMapProperties(state)
  }
}

export default connect(mapStateToProps)(Component);
