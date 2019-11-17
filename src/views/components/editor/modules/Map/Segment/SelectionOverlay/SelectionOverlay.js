import React from 'react';

import { concatClassNames } from 'lib/utils';
import { useKeyPress } from 'lib/hooks';

import styles from './selectionoverlay.module.css';

export default ({ style, grid, tileSize }) => {
  const shiftKeyPressed = useKeyPress('shift');
  if (grid.length === 0) return null;

  const wrapperWidth = tileSize.width * grid.length;
  const wrapperHeight = tileSize.height * grid[0].length;

  const tileClassNames = concatClassNames([
      styles.tile,
      (shiftKeyPressed) ? styles.clear : styles.set,
  ]);

  return (
    <div
      className={styles.wrapperOuter}
      style={{
        width: wrapperWidth,
        height: wrapperHeight,
        ...style
      }}
    >
      <div className={styles.wrapperInner}>
        {
          grid.map((column, columnIndex) =>
            column.map((tileValue, rowIndex) => (
              (tileValue)
                ? <div
                  key={`${columnIndex}-${rowIndex}`}
                  className={tileClassNames}
                  style={{
                    width: tileSize.width,
                    height: tileSize.height,
                    left: (tileSize.width) * columnIndex - 1,
                    top: (tileSize.height) * rowIndex - 1,
                  }}
                />
                : null
            )))
        }
      </div>
    </div>
  );
}
