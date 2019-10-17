import React from 'react';
import { connect } from 'react-redux';

import { useContextMenu } from 'lib/hooks';

import { ReactComponent as zoomInIcon } from 'assets/static/icons/editor/zoom-in.svg';
import { ReactComponent as zoomOutIcon } from 'assets/static/icons/editor/zoom-out.svg';
import { ReactComponent as deleteIcon } from 'assets/static/icons/editor/delete.svg';

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
    const items = [
      {
        type: 'item', // 'select', 'toggle', 'parent'
        name: 'Delete layer: ',
        keybinding: 'Alt + P',
        action: () => console.log('Clicked menu option 1')
      },
      {
        type: 'separator'
      },
      {
        type: 'item', // 'select', 'toggle', 'parent'
        name: 'Zoom in',
        keybinding: 'Alt + +',
        icon: zoomInIcon,
        action: () => console.log('Clicked menu option 2'),
        leaveContextMenuOpenAfterAction: true
      },
      {
        type: 'item', // 'select', 'toggle', 'parent'
        name: 'Zoom out',
        keybinding: 'Alt + -',
        icon: zoomOutIcon,
        action: () => console.log('Clicked menu option 3'),
        leaveContextMenuOpenAfterAction: true
      }
    ];

    openContextMenu(e, items)
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

    <ContextMenu/>
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
