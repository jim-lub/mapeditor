import React from 'react';

import { ReactComponent as HappyFaceIcon } from 'assets/static/icons/mood/blue/happy.svg';

import styles from './dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.getStartedContainer}><GetStarted /></div>
        <div className={styles.quickStartContainer}><QuickStart /></div>
      </div>
    </div>
  )
}

const GetStarted = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <HappyFaceIcon className={styles.icon}/>
      </div>


      <h2>Welcome to mapeditor.app!</h2><br />

      <span className={styles.text}>
        This project is an attemp to create a <span className="italic">Tile Map</span> level
        editor which runs in the browser. All data will be stored on the servers, meaning you can access your
        maps on the go! Development is still in a very early stage, but most basic features of the editor
        are already implemented. Designing an application like this for a webbrowser presents a huge challenge, but
        major steps have been made along the way to make it feasible. There is still a ton of code to be written, bugs to be fixed
        and features to be developed before I can even think about a release. I'm always looking for feedback to
        improve the product. If you find any bugs or like to see a feature added please reach out to me
        on <a href="https://github.com/jim-lub/mapeditor" target="_blank" rel="noopener noreferrer">Github</a>!

        <div className={styles.quote}>
          A <span className="italic">Tile Map</span> is a component that allows you to assemble,
          or paint, tiles from a Tile Source onto a large grid area. Tile maps
          are commonly used to build game level environments.
        </div>

        <div className={styles.disclaimer}>
          Warning! There is no export functionallity yet and database wipes are going to happen every now and then until release. So any
          work you do will be forfeit.
        </div>
      </span><br />
    </div>
  )
}

const QuickStart = () => {
  return (
    <div className={styles.container}>
      <h2>Quick start guide</h2><br />
      <div className={styles.list}>
        <ol>
          <li className={styles.li}>Go to the `Projects` page</li>
          <li className={styles.li}>Create a project by clicking on the plus (+) sign on the bottom of the left-most column.</li>
          <li className={styles.li}>Enter a project name (required) and a description (optional) and click `create`.</li>
          <li className={styles.li}>Create a scene by clicking on the plus (+) sign on the bottom of the second column.</li>
          <li className={styles.li}>Enter a scene name (required) and a description (optional).</li>
          <li className={styles.li}>Enter the desired map size in columns (1-50) and rows (1-50) (multiply by 512px for actual map size).</li>
          <li className={styles.li}>Click `create` and the scene you just created will be shown on the right.</li>
          <li className={styles.li}>Click the blue button with the text `Open Scene` and you'll be redirected to the editor</li>
          <li className={styles.li}>Play around, break some stuff.. report the broken stuff?</li>
        </ol>
      </div>
    </div>
  )
}

// <li>Go to the projects page</li>
// <li>Create a project by clicking the '+' sign on the bottom of the left column</li>
// <li>Enter a project name (required) and a description (optional) and click create</li>
// <li>Create a scene by click the '+' sign on the bottom of the right column</li>
// <li>Enter a scene name (required) and a description (optional)</li>
// <li>Enter the amount of columns (1-50) and rows (1-50) for the map</li>
// <li>Click create and the scene you just created will be selected</li>
// <li>Click the blue 'Open Scene' button which just appeared</li>
// <li>Play around, break some stuff.. report the broken stuff?!</li>

// export const Dashboard = () => {
//   return (
//     <div>
//
//       <div style={{float: "left", width: 400, margin: 10, padding: 10, border: "solid 1px #d5d5d5", backgroundColor: "#fff"}}>
//         <h3>Readme</h3>
//         <div style={{margin: 5}}>
//           The mapeditor app is still in a very early alpha stage, major functionallity will change and databae wipes are bound to happen.
//           Due to this, it's adviced to not spend too much time on building out a detailed map, but rather fiddle
//           around with the features currently implemented and leave any bugs you find on the <a href="https://github.com/jim-lub/mapeditor" target="_blank" rel="noopener noreferrer">github repo</a>.
//           If there is a feature you'd like to see within the app (which isn't on the roadmap yet) feel free to let me know.
//           <br /><br />
//           <span style={{fontStyle: "italic"}}>Warning: the nature of this app made me decide to develop desktop first, so mobile support is little to none.</span>
//         </div>
//       </div>
//
//       <div style={{float: "left", width: 500, margin: 10, marginLeft: 0, padding: 10, border: "solid 1px #d5d5d5", backgroundColor: "#fff"}}>
//         <h3>Quick start guide..</h3>
//         <div style={{margin: 0}}>
//           <span style={{fontWeight: "bold", marginLeft: 2}}>..To get you started while I take my sweet time to improve the UX..</span>
//         </div>
//         <ol style={{marginLeft: 5, paddingLeft: 28, borderLeft: "solid 1px #d5d5d5"}}>
//           <li>Go to the projects page</li>
//           <li>Create a project by clicking the '+' sign on the bottom of the left column</li>
//           <li>Enter a project name (required) and a description (optional) and click create</li>
//           <li>Create a scene by click the '+' sign on the bottom of the right column</li>
//           <li>Enter a scene name (required) and a description (optional)</li>
//           <li><span style={{textDecoration: "line-through"}}>Choose a scene preset</span></li>
//           <li>Enter the amount of columns (1-50) and rows (1-50) for the map</li>
//             <span style={{fontSize: 9}}>These values will specify the amount of segments (512 x 512px) the map will have. Each segment can contain multiple layers which hold tiles ranging from 32px to 512px</span>
//           <li>Click create and the scene you just created will be selected</li>
//           <li>Click the blue 'Open Scene' button which just appeared</li>
//           <li>Play around, break some stuff.. report the broken stuff?!</li>
//         </ol>
//       </div>
//     </div>
//   )
// }
