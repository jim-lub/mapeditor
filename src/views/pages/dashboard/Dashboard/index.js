import React from 'react';

import { ReactComponent as HappyFaceIcon } from 'assets/static/icons/mood/blue/happy.svg';

import styles from './dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <GetStarted />
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
