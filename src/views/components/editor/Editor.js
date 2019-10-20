import React from 'react';

import { ModuleGrid } from './components/ModuleGrid';

import {
  ColorPicker,
  Map
} from './modules';

import styles from './editor.module.css';

const modules = [
  {
    key: 'colorPicker',
    displayName: 'Colors',
    Component: ColorPicker
  },
  {
    key: 'map',
    displayName: 'Map',
    Component: Map
  }
]

export default () => {
  return (
    <div className={styles.wrapper}>
      <ModuleGrid
        modules={modules}
      />
    </div>
  );
}
