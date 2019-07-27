import React, { useState, useImperativeHandle } from 'react';

import scenePresetsArr from 'constants/scenePresets';

export default (props, ref) => {
  const [sceneName, setSceneName] = useState('');
  const [sceneDesc, setSceneDesc] = useState('');
  const [scenePresets, setScenePresets] = useState('001-8x512');

  useImperativeHandle(ref, () => ({
    name: sceneName,
    desc: sceneDesc,
    presets: scenePresets
  }));

  return (
    <form>
      <div><h2>Create new scene</h2></div>
      <label htmlFor="scene_name">Name</label>
      <input type="text" name="scene_name" placeholder="Name.." style={{width: "100%"}} value={sceneName} onChange={(e) => { setSceneName(e.target.value)}} className="validation-false" />

      <label htmlFor="scene_description">Description</label>
      <textarea type="text" name="scene_description" placeholder="Description.." style={{width: "100%"}} value={sceneDesc} onChange={(e) => { setSceneDesc(e.target.value)}} />

      <label htmlFor="scene_presets">Presets</label>
      <label htmlFor="scene_presets" className="description">Warning: The preset can't be changed after scene creation!</label>
      <div>
        <select name="scene_presets" style={{width: "100%"}} onChange={(e) => { setScenePresets(e.target.value)}} value={scenePresets}>
          {
            Object.entries(scenePresetsArr).map(([key, value]) => {
              return <option key={key} value={key}>{value.name}</option>;
            })
          }
        </select>
      </div>
      {
        (scenePresets !== '')
        ? <div>
            Segment size: {scenePresetsArr[scenePresets].segmentSize[0]} <br />
            Tile sizes: {scenePresetsArr[scenePresets].tileSizes.map((val) => val + ", ")}
          </div>
        : null
      }
    </form>
  )
}
