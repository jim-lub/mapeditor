import React from 'react';

import { concatClassNames } from 'lib/utils';
import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import styles from '../../segment.module.css';

export default ({ segmentWidth, segmentHeight, layerProperties: { tileSize }, tilemapData, disable, onPointerEvent, activeTool }) => {
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
        leftClick: (button === 0 && buttons === 1),
        rightClick: (button === 2 && buttons === 2),
        leftClickAndHold: (button === -1 && buttons === 1) || (button === -1 && buttons === 2)
      },
      pen: {
        hover: (button === -1 && buttons === 0), // hover
        leftClick: (button === 0 && buttons === 1), // regular pen down or left mouse button alt
        rightClick: (button === 2 && buttons === 2), // pen down with no pressure OR pen hover + click right mouse button
        leftClickAndHold: (button === -1 && buttons === 2) // right click button and hover
      }
    }

    if (pointerType === "mouse"){
      const { leftClick, rightClick, leftClickAndHold } = pointerActions.mouse;
      if (leftClick || rightClick || leftClickAndHold) {
        onPointerEvent({
          columnIndex,
          rowIndex,
          inputActions: {
            leftClick, rightClick, leftClickAndHold
          },
          inputModifiers: {
            altKey, ctrlKey, shiftKey
          }
        })
      }
    }

    if (pointerType === "pen" || pointerType === "touch") {
      const { leftClick, rightClick, leftClickAndHold } = pointerActions.pen;
      if (leftClick || rightClick || leftClickAndHold) {
        onPointerEvent({
          columnIndex,
          rowIndex,
          inputActions: {
            leftClick, rightClick, leftClickAndHold
          },
          inputModifiers: {
            altKey, ctrlKey, shiftKey
          }
        })
      }
    }
  }

  const targetIdToIndexes = (id) => ({
    columnIndex: id.split('-')[1],
    rowIndex: id.split('-')[2],
  });

  const inputNodeClassNames = concatClassNames([
    styles.interactionNode,
    (activeTool === toolTypes.eyeDropper) ? styles.eyeDropperInput : null
  ])

  return (
    <div className={styles.interactionWrapper}>
      <div className={styles.interactionNodeContainer}>
        {
          [...new Array( columns )].map((val, columnIndex) => {
            return [...new Array( rows )].map((val, rowIndex) => {
              return (
                <div
                  key={`${columnIndex}-${rowIndex}`}
                  id={`interactionNode-${columnIndex}-${rowIndex}`}
                  className={inputNodeClassNames}
                  onContextMenu={handleContextMenu}
                  onPointerDown={handlePointerDown}
                  onPointerOver={handlePointerOver}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: tileSize.width,
                    height: tileSize.height,
                    left: tileSize.width * columnIndex,
                    top: tileSize.height * rowIndex,
                    cursor: toolConstants[activeTool].cursor || "auto"
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
