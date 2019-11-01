import React from 'react';
import { connect } from 'react-redux';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import moduleConstants from 'lib/constants/editorModuleConstants';

import { ModuleGrid } from './components/ModuleGrid';
import { Actionbar } from './modules';

import styles from './editor.module.css';

const Component = ({ storeMapStatus }) => {
  const modules = Object.values(moduleTypes).map(type => {
    const { name, Icon, Component } = moduleConstants[type];

    return {
      type,
      name,
      Icon,
      Component
    }
  })

  return (
    <div className={styles.grid}>
      <div className={styles.actionbarWrapper}>
        <Actionbar />
      </div>

      <div className={styles.contentWrapper}>
        <ModuleGrid
          modules={modules}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(Component);