import React from 'react';

import {
  buildTwoDimensionalArray,
  concatClassNames
} from 'lib/utils';
import toolConstants from 'lib/constants/toolConstants';

import styles from '../../segment.module.css';

export default ({
  segmentSize,
  layerProperties: { tileSize },
  activeTool,
  onPointerEvent
}) => {
  const columns = segmentSize.width / tileSize.width;
  const rows = segmentSize.height / tileSize.height;

  const handleContextMenu = (e) => e.preventDefault();
  const handlePointerDown = (e) => handlePointerEvent(e);
  const handlePointerOver = (e) => handlePointerEvent(e);

  const handlePointerEvent = (pointerEvent) => {
    const { pointerType, button, buttons, altKey, ctrlKey, shiftKey, target } = pointerEvent;
    const { columnIndex, rowIndex } = _targetIdToIndexes(target.id);
    pointerEvent.preventDefault();

    const pointerActions = _toPointerActionsObject({ button, buttons });

    if (pointerType === "mouse") {
      onPointerEvent({
        columnIndex, rowIndex,
        inputActions: {
          ...pointerActions.mouse
        },
        inputModifiers: {
          altKey, ctrlKey, shiftKey
        }
      })
    }
  }

  const inputNodeClassName = concatClassNames([
    styles.userInputNode
  ])

  return (
    <div className={styles.userInputWrapperOuter}>
      <div className={styles.userInputWrapperInner}>
        {
          buildTwoDimensionalArray({
            columns, rows,
            mapFn: ({ columnIndex, rowIndex }) => (
              <div
                key={`${columnIndex}-${rowIndex}`}
                id={`inputNode-${columnIndex}-${rowIndex}`}
                className={inputNodeClassName}
                style={{
                  width: tileSize.width,
                  height: tileSize.height,
                  left: tileSize.width * columnIndex,
                  top: tileSize.height * rowIndex,
                  cursor: toolConstants[activeTool].cursor || "auto"
                }}
                onContextMenu={handleContextMenu}
                onPointerDown={handlePointerDown}
                onPointerOver={handlePointerOver}
              />
            )
          })
        }
      </div>
    </div>
  );
}

const _targetIdToIndexes = (id) => ({
  columnIndex: id.split('-')[1],
  rowIndex: id.split('-')[2],
});

const _toPointerActionsObject = ({ button, buttons }) => ({
  mouse: {
    hover: (button === -1 && buttons === 0),
    leftClick: (button === 0 && buttons === 1),
    rightClick: (button === 2 && buttons === 2),
    leftClickAndHold: (button === -1 && buttons === 1),
    rightClickAndHold: (button === -1 && buttons === 2)
  },
  // pen: {
  //   hover: (button === -1 && buttons === 0), // hover
  //   leftClick: (button === 0 && buttons === 1), // regular pen down or left mouse button alt
  //   rightClick: (button === 2 && buttons === 2), // pen down with no pressure OR pen hover + click right mouse button
  //   leftClickAndHold: (button === -1 && buttons === 2), // right click button and hover
  //   rightClickAndHold: (button === -1 && buttons === 2) // right click button and hover
  // }
})
