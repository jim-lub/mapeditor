import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCurrentScene } from 'state/ducks/editor/map';
// import { getSceneCollection } from 'state/ducks/scenes';

import { Scenes } from 'views/components/Scenes';
import { LinkButton } from 'views/components/LinkButton';

import { ReactComponent as NotFoundIcon } from 'assets/static/icons/other/404.svg';
import { ReactComponent as SceneIcon } from 'assets/static/icons/other/scene.svg';

import styles from './noscenewindow.module.css';

const Component = ({ sceneCollection = [], actions }) => {
  return <Scenes />;

  // const sceneList = Object.values(sceneCollection);
  //
  // if (sceneList.length === 0) {
  //   return (
  //     <div className={styles.container}>
  //       <div className={styles.iconWrapper}>
  //         <NotFoundIcon className={styles.icon}/>
  //       </div>
  //
  //       <div style={{width: "75%", margin: "0 auto"}}>
  //         <h4>No scenes found. Go to the <span className="bold">scenes</span> page to create you're first scene.</h4><br />
  //       </div>
  //       <LinkButton className="blue" to="/scenes">Get started!</LinkButton>
  //     </div>
  //   );
  // }
  //
  // return (
  //   <div className={styles.wrapper}>
  //     <div className={styles.container}>
  //       <div className={styles.iconWrapper}>
  //         <SceneIcon className={styles.icon}/>
  //       </div>
  //       <h3 className={styles.textBold}>No scene selected..</h3>
  //       <h4 className={styles.text}>Would you like to open a recent scene?</h4>
  //
  //       <div className={styles.flexBox}>
  //         {
  //           sceneList.map(({ uid, name, projectId, modifiedAt }, index) => {
  //             return (
  //               <div
  //                 key={index}
  //                 className={styles.flexItem}
  //                 onClick={() => actions.setCurrentScene({ uid })}
  //               >
  //                 { name }
  //               </div>
  //             )
  //           })
  //         }
  //       </div>
  //
  //       <div className={styles.or}></div>
  //
  //       <LinkButton className="blue" to="/projects">Manage scenes</LinkButton>
  //     </div>
  //   </div>
  // );
}

const mapStateToProps = (state) => {
  return {
    // sceneCollection: getSceneCollection(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setCurrentScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
