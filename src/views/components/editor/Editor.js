import React from 'react';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import moduleConstants from 'lib/constants/editorModuleConstants';

import { ModuleGrid } from './components/ModuleGrid';

import styles from './editor.module.css';

export default () => {
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
    <div className={styles.wrapper}>
      <ModuleGrid
        modules={modules}
      />
    </div>
  );
}
