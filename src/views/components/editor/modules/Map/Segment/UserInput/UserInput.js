import React from 'react';

import { buildGrid } from 'lib/utils';

import styles from '../segment.module.css';

export default ({ segmentSize, tileSize, zoomScaleModifier = 1, onPointerEvent }) => {
  const handlePointerDown = (e) => handlePointerEvent(e);
  const handlePointerUp = () => null;
  const handlePointerOver = (e) => handlePointerEvent(e);

  const handlePointerEvent = (pointerEvent) => {
    const { pointerType, button, buttons, altKey, ctrlKey, shiftKey, target } = pointerEvent;
    const { columnIndex, rowIndex } = _targetIdToIndexes(target.id);
    pointerEvent.preventDefault();

    // set position of selection overlay here..

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

  const renderGrid = () => {
    if (!segmentSize || !tileSize) return;

    const width = tileSize.width * zoomScaleModifier;
    const height = tileSize.height * zoomScaleModifier;

    return (
      buildGrid({
        columns: segmentSize.width / tileSize.width,
        rows: segmentSize.height / tileSize.height,
        fill: ({ columnIndex, rowIndex }) => (
          <div
            key={`${columnIndex}-${rowIndex}`}
            id={`${columnIndex}-${rowIndex}`}
            className={styles.userInputNode}
            style={{
              width,
              height,
              left: width * columnIndex,
              top: height * rowIndex
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOver={handlePointerOver}
          />
        )
      })
    )
  }

  return (
    <div className={styles.userInputWrapper}>
      { renderGrid() }
    </div>
  );
}

const _targetIdToIndexes = (id) => ({
  columnIndex: id.split('-')[0],
  rowIndex: id.split('-')[1],
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
});
