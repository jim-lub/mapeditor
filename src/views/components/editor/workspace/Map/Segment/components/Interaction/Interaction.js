import React from 'react';

import styles from '../../segment.module.css';

export default ({ segmentWidth, segmentHeight, layerProperties: { tileSize }, onInteractionNodeClick }) => {
  const columns = segmentWidth / tileSize.width;
  const rows = segmentHeight / tileSize.height;

  const handleClick = (e) => {
    const getIndexesFromId = e.target.id.split('-');

    onInteractionNodeClick({
      columnIndex: getIndexesFromId[1],
      rowIndex: getIndexesFromId[2]
    });
  }

  return (
    <div className={styles.interactionWrapper}>
      <div className={styles.interactionNodeContainer}>
        {
          [...new Array( columns )].map((val, columnIndex) => {
            return [...new Array( rows )].map((val, rowIndex) => {
              return (
                <button
                  key={`${columnIndex}-${rowIndex}`}
                  id={`interactionNode-${columnIndex}-${rowIndex}`}
                  className={styles.interactionNode}
                  onMouseDown={handleClick}
                  style={{
                    width: tileSize.width,
                    height: tileSize.height,
                    left: tileSize.width * columnIndex,
                    top: tileSize.height * rowIndex
                  }}
                />
              )
            })
          })
        }
      </div>
    </div>
  );
}
