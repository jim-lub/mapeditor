import React from 'react';

import { Loader } from 'views/components/Loader';

import styles from '../../../modal.module.css';

export default ({ initialized, scenes = [] }) => {
  if (scenes.length === 0) return null;

  return (
    <div className={styles.list + " " + styles.warning}>
      <span style={{fontWeight: "bold"}}>The following scene(s) will also be deleted:</span>
      <ul>
        {
          scenes.map(scene => {
            return (
              <li key={scene.uid}>{ scene.name }</li>
            )
          })
        }
      </ul>
    </div>
  )
}
