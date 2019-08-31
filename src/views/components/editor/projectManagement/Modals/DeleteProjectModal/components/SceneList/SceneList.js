import React from 'react';

import { Loader } from 'views/components/Loader';

import styles from '../../deleteprojectmodal.module.css';

export default ({ initialized, scenes = [] }) => {
  if (!initialized) {
    return (
      <div className={styles.sceneList}>
        <span style={{fontWeight: "bold"}}>The following scene(s) will also be deleted:</span><br/>
        <Loader.Simple width={24} height={24}/>
      </div>
    )
  }

  if (scenes.length === 0) return null;

  return (
    <div className={styles.sceneList}>
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
