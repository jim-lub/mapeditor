import React from 'react';

import styles from '../../segment.module.css';

export default ({ segmentWidth, segmentHeight, layerProperties: { tileSize }, tilemapData, onMouseEvent }) => {
  const columns = segmentWidth / tileSize.width;
  const rows = segmentHeight / tileSize.height;

  const handleContextMenu = (e) => e.preventDefault();
  const handleMouseDown = (e) => handleMouseEvent(e);
  const handleMouseOver = (e) => (e.buttons !== 0) ? handleMouseEvent(e) : null;

  const handleMouseEvent = (e) => {
    const leftMouseButton = (e.buttons === 1);
    const rightMouseButton = (e.buttons === 2);
    const scrollButton = (e.buttons === 4);
    const altModifier = e.altKey;
    const shiftModifier = e.shiftKey;
    const { columnIndex, rowIndex } = targetIdToIndexes(e.target.id);

    if (leftMouseButton || rightMouseButton || scrollButton) {
      onMouseEvent({
        columnIndex,
        rowIndex,
        leftMouseButton,
        rightMouseButton,
        scrollButton,
        altModifier,
        shiftModifier
      })
    };
  }

  const targetIdToIndexes = (id) => ({
    columnIndex: id.split('-')[1],
    rowIndex: id.split('-')[2],
  });

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
                  onMouseDown={handleMouseDown}
                  onMouseOver={handleMouseOver}
                  onContextMenu={handleContextMenu}
                  style={{
                    padding: 0,
                    margin: 0,
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
