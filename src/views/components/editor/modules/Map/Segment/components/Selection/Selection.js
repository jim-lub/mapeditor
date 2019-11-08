import React from 'react';

import styles from './selection.module.css';

export default ({ tileSize, grid, position }) => {
  if (grid.length === 0) return null;

  const wrapperWidth = tileSize.width * grid.length;
  const wrapperHeight = tileSize.height * grid[0].length;

  return (
    <div
      className={styles.wrapperOuter}
      style={{
        width: wrapperWidth,
        height: wrapperHeight,
        ...position
      }}
    >
      <div className={styles.wrapperInner}>
        {
          grid.map((column, columnIndex) =>
            column.map((tileValue, rowIndex) => (
              (tileValue)
                ? <div
                  key={`${columnIndex}-${rowIndex}`}
                  className={styles.tile}
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
