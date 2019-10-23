import React from 'react';

import { ModuleGrid } from './components/ModuleGrid';

import {
  ColorPicker,
  Layers,
  Map,
  Properties
} from './modules';

import styles from './editor.module.css';

const modules = [
  {
    key: 'colorPicker',
    displayName: 'Colors',
    Component: ColorPicker
  },
  {
    key: 'layers',
    displayName: 'Layers',
    Component: Layers
  },
  {
    key: 'map',
    displayName: 'Map',
    Component: Map
  },
  {
    key: 'properties',
    displayName: 'Properties',
    Component: Properties
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
