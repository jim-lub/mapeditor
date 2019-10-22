import React, { useState, useRef, useEffect } from 'react';

import { ModuleGrid } from './components/ModuleGrid';

import {
  ColorPicker,
  Layers,
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
    key: 'layers',
    displayName: 'Layers',
    Component: Layers
  },
  {
    key: 'map',
    displayName: 'Map',
    Component: Map
  }
]

export default () => {
  const [isScrollable, setIsScrollable] = useState(true);
  const wrapperRef = useRef();

  const handleSomething = () => console.log('something')

  useEffect(() => {
    wrapperRef.current.addEventListener('resize', handleSomething)
  }, [wrapperRef])

  const getOffset = () => {
    const el = document.getElementById('editor-module-wrapper');
    console.log(el)
    console.log(el.clientWidth, el.offsetWidth, el.scrollWidth)
    console.log(el.clientHeight, el.offsetHeight, el.scrollHeight)
    return 0;
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ModuleGrid
        modules={modules}
        isScrollable={isScrollable}
      />
    </div>
  );
}
