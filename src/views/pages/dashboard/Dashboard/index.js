import React from 'react';

export const Dashboard = () => {
  return (
    <div>

      <div style={{float: "left", width: 400, margin: 10, padding: 10, border: "solid 1px #d5d5d5", backgroundColor: "#fff"}}>
        <h3>Readme</h3>
        <div style={{margin: 5}}>
          The mapeditor app is still in a very early alpha stage, major functionallity will change and databae wipes are bound to happen.
          Due to this, it's adviced to not spend too much time on building out a detailed map, but rather fiddle
          around with the features currently implemented and leave any bugs you find on the <a href="https://github.com/jim-lub/mapeditor" target="_blank" rel="noopener noreferrer">github repo</a>.
          If there is a feature you'd like to see within the app (which isn't on the roadmap yet) feel free to let me know.
          <br /><br />
          <span style={{fontStyle: "italic"}}>Warning: the nature of this app made me decide to develop desktop first, so mobile support is little to none.</span>
        </div>
      </div>

      <div style={{float: "left", width: 500, margin: 10, marginLeft: 0, padding: 10, border: "solid 1px #d5d5d5", backgroundColor: "#fff"}}>
        <h3>Quick start guide..</h3>
        <div style={{margin: 0}}>
          <span style={{fontWeight: "bold", marginLeft: 2}}>..To get you started while I take my sweet time to improve the UX..</span>
        </div>
        <ol style={{marginLeft: 5, paddingLeft: 28, borderLeft: "solid 1px #d5d5d5"}}>
          <li>Go to the projects page by using the navigation bar on the left</li>
          <li>Create a project by clicking the '+' sign on the bottom of the left column</li>
          <li>Enter a project name (required) and a description (optional) and click create</li>
          <li>Create a scene by click the '+' sign on the bottom of the right column</li>
          <li>Enter a scene name (required) and a description (optional)</li>
          <li><span style={{textDecoration: "line-through"}}>Choose a scene preset</span></li>
          <li>Enter the amount of columns (1-50) and rows (1-50) for the map</li>
            <span style={{fontSize: 9}}>These values will specify the amount of segments (512 x 512px) the map will have. Each segment can contain multiple layers which hold tiles ranging from 32px to 512px</span>
          <li>Click create and the scene you just created will be selected</li>
          <li>Click the blue 'Open Scene' button which just appeared</li>
          <li>PLAY AROUND!</li>
          <li>Report the stuff you broke.. please?</li>
        </ol>
      </div>
    </div>
  )
}
