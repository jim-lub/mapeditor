import React from 'react';
import { connect } from 'react-redux';

import { useContextMenu } from 'lib/hooks';

import styles from './properties.module.css';

import {
  getMapProperties
} from 'state/ducks/editor/map';

import {
  getZoomScaleModifier
} from 'state/ducks/editor/tools';

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';

const Component = ({ mapProperties, zoomScaleModifier }) => {
  const [ContextMenu, openContextMenu] = useContextMenu();
  if (!mapProperties.mapSize) return null;

  const handleContextMenu = (e, index) => {
    const children = [
      {
        name: 'Menu option 1: ' + index,
        type: 'clickAndClose', // 'select', 'toggle', 'parent'
        onClick: () => console.log('Clicked menu option 1')
      },
      {
        name: 'Menu option 2',
        type: 'select', // 'select', 'toggle', 'parent'
        onClick: () => console.log('Clicked menu option 2')
      },
      {
        name: 'Menu option 3',
        type: 'select', // 'select', 'toggle', 'parent'
        onClick: () => console.log('Clicked menu option 3')
      }
    ]

    openContextMenu(e, children)
  }

  const properties = [
    { key: "Columns", value: mapProperties.mapSize.columns },
    { key: "Rows", value: mapProperties.mapSize.rows },
    { key: "Segment width", value: mapProperties.segmentSize.width },
    { key: "Segment height", value: mapProperties.segmentSize.height },
    { key: "Chunks", value: mapProperties.chunks }
  ]

  return (
    <>
    <WorkspaceModuleWrapper moduleName="Properties" minHeight={155} maxHeight={155}>
      <table className={styles.propertiesList}>
        <tbody>
          {
            properties.map((prop, index) => {
              return (
                <tr key={index} className={styles.node} onContextMenu={(e) => handleContextMenu(e, index)}>
                  <td className={styles.nodeKey}>{ prop.key }</td>
                  <td className={styles.nodeValue}>{ prop.value }</td>
                </tr>
              )
            })
          }
          <tr className={styles.node}>
            <td className={styles.nodeKey}>Zoom</td>
            <td className={styles.nodeValue}>{ `${ zoomScaleModifier * 100 }%` }</td>
          </tr>
        </tbody>
      </table>
    </WorkspaceModuleWrapper>

    <ContextMenu />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    mapProperties: getMapProperties(state),
    zoomScaleModifier: getZoomScaleModifier(state)
  }
}

export default connect(mapStateToProps)(Component);
