import React from 'react';

import styles from '../../segment.module.css';

export default ({ segmentWidth, segmentHeight, layerProperties: { tileSize }, tilemapData, disable, onMouseEvent }) => {
  const columns = segmentWidth / tileSize.width;
  const rows = segmentHeight / tileSize.height;

  const handleContextMenu = (e) => e.preventDefault();
  const handlePointerDown = (e) => handlePointerEvent(e);
  const handlePointerOver = (e) => handlePointerEvent(e);

  const handlePointerEvent = (pointerEvent) => {
    pointerEvent.preventDefault();
    const { pointerType, button, buttons, altKey, ctrlKey, shiftKey, target } = pointerEvent;
    const { columnIndex, rowIndex } = targetIdToIndexes(target.id);

    const pointerActions = {
      mouse: {
        hover: (button === -1 && buttons === 0),
        leftClickAction: (button === 0 && buttons === 1),
        rightClickAction: (button === 2 && buttons === 2),
        paintAction: (button === -1 && buttons === 1) || (button === -1 && buttons === 2)
      },
      pen: {
        hover: (button === -1 && buttons === 0), // hover
        leftClickAction: (button === 0 && buttons === 1), // regular pen down or left mouse button alt
        rightClickAction: (button === 2 && buttons === 2), // pen down with no pressure OR pen hover + click right mouse button
        paintAction: (button === -1 && buttons === 2) // right click button and hover
      }
    }

    if (pointerType === "mouse"){
      const { leftClickAction, rightClickAction, paintAction } = pointerActions.mouse;
      if (leftClickAction || rightClickAction || paintAction) {
        onMouseEvent({
          columnIndex,
          rowIndex,
          leftClickAction,
          rightClickAction,
          paintAction,
          altKey,
          ctrlKey,
          shiftKey
        })
      }
    }

    if (pointerType === "pen" || pointerType === "touch") {
      const { leftClickAction, rightClickAction, paintAction } = pointerActions.pen;
      if (leftClickAction || rightClickAction || paintAction) {
        onMouseEvent({
          columnIndex,
          rowIndex,
          leftClickAction,
          rightClickAction,
          paintAction,
          altKey,
          ctrlKey,
          shiftKey
        })
      }
    }
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
                  onContextMenu={handleContextMenu}
                  onPointerDown={handlePointerDown}
                  onPointerOver={handlePointerOver}
                  disabled={disable}
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
