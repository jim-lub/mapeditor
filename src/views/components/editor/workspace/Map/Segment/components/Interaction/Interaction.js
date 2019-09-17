import React from 'react';

import styles from '../../segment.module.css';

export default ({ segmentWidth, segmentHeight, layerProperties: { tileSize }, tilemapData, onMouseEvent }) => {
  const columns = segmentWidth / tileSize.width;
  const rows = segmentHeight / tileSize.height;

  const handlePointerDown = (e) => {
    log(e, { name: "onPointerDown"});
  }

  const handlePointerMove = (e) => {
    // log(e, { name: "onPointerMove"});
  }

  const handlePointerUp = (e) => {
    // log(e, { name: "onPointerUp"});
  }

  const handlePointerCancel = (e) => {
    // log(e, { name: "onPointerCancel"});
  }

  const handlePointerEnter = (e) => {
    // log(e, { name: "onPointerEnter"});
  }

  const handlePointerLeave = (e) => {
    // log(e, { name: "onPointerLeave"});
  }

  const handlePointerOver = (e) => {
    log(e, { name: "onPointerOver"});
  }

  const handlePointerOut = (e) => {
    // log(e, { name: "onPointerOut"});
  }

  const handleGotPointerCapture = (e) => {
    e.preventDefault()
    // log(e, { name: "onGotPointerCapture"});
  }

  const handleLostPointerCapture = (e) => {
    // log(e, { name: "onLostPointerCapture"});
  }

  const log = (pointerEvent) => {
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
  }

  const handleContextMenu = (e) => e.preventDefault();
  const handleMouseDown = (e) => handleMouseEvent(e);
  const handleMouseOver = (e) => (e.buttons !== 0) ? handleMouseEvent(e) : null;

  const handleMouseEvent = (e) => {
    // console.log(e.type)
    // console.log(e.buttons)
    const leftMouseButton = (e.buttons === 1);
    const rightMouseButton = (e.buttons === 2);
    const scrollButton = (e.buttons === 4);
    const altModifier = e.altKey;
    const ctrlModifier = e.ctrlKey;
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
        ctrlModifier,
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
                  onContextMenu={handleContextMenu}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={handlePointerLeave}
                  onPointerOver={handlePointerOver}
                  onPointerOut={handlePointerOut}
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
