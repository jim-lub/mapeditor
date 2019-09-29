import React from 'react';

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{width: 500, margin: 5}}>
        The mapeditor app is still in a very early alpha stage and under heavy development.
        At this stage nothing is set in stone yet, so frequent database wipes are going to happen.
        Due to this fact it's adviced to not spend too much time on building out a detailed map, but rather fiddle
        around with the features currently implemented and leave any bugs you find on the publicly accessible <a href="https://github.com/jim-lub/mapeditor" target="_blank">github repo</a>.
        If there is feature you'd like to see within the app (which isn't on the roadmap yet) feel free to let me know.
      </div>
      <div style={{margin: 5}}>
        <h4>Quick start guide</h4>
        <span style={{fontWeight: "bold", marginLeft: 3}}>While I take my time to improve the UX of the app, use this guide to get you started:</span>
      </div>
      <ol style={{width: 500, marginLeft: 5, paddingLeft: 25, borderLeft: "solid 1px #555555"}}>
        <li>Go to the projects page by using the navigation bar on the left</li>
        <li>Create a project by clicking the '+' sign on the bottom of the left column</li>
        <li>Enter a project name (required) and a description (optional) and click create</li>
        <li>Create a scene by click the '+' sign on the bottom of the right column</li>
        <li>Enter a scene name (required) and a description (optional)</li>
        <li><span style={{textDecoration: "line-through"}}>Choose a scene preset</span></li>
        <li>Enter the amount of columns (1-50) and rows (1-50) you want the map to be</li>
          <span style={{fontSize: 9}}>These values will specify the amount of segments (512 x 512px) the map will have. Each segment can contain into multiple layers which hold tiles ranging from 32px to 512px</span>
        <li>Click create and the scene you just created will be selected</li>
        <li>Click the blue 'Open Scene' button which just appeared</li>
        <li>PLAY AROUND AND TRY TO BREAK STUFF!</li>
      </ol>
    </div>
  )
}
