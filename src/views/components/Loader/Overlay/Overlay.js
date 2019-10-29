import React, { useState, useEffect, useRef } from 'react';

import { Simple as SimpleLoader } from '../Simple';

import styles from './overlay.module.css';

export default () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, [setWidth, setHeight]);

  return (
    <div className={styles.overlay} ref={ref}>
      <div
        style={{
          marginLeft: (width / 2 - 24),
          marginTop: (height / 2 - 24)
        }}
      >
        { (width > 0) && (height > 0) && <SimpleLoader width={48} height={48}/> }
      </div>
    </div>
  )
}
