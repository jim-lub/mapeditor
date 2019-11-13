import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from '../../../modal.module.css';

export default ({ initialized, scenes = [] }) => {
  if (scenes.length === 0) return null;

  return (
    <div className={styles.list + " " + styles.warning}>
      <span style={{fontWeight: "bold"}}>The following scene(s) will also be deleted:</span>
      <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={120}>
        <ul>
          {
            scenes.map(scene => {
              return (
                <li key={scene.uid}>{ scene.name }</li>
              )
            })
          }
        </ul>
      </Scrollbars>
    </div>
  )
}
