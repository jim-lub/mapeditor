import React, { useState } from 'react';

import {
  buildTwoDimensionalArray,
  concatClassNames
} from 'lib/utils';

import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import { Selection } from '../../components';

import styles from '../../segment.module.css';

export default ({
  segmentSize, zoomScaleModifier,
  layerProperties: { tileSize },
  currentTool, tileSelectionGrid,
  onPointerEvent
}) => {
  const [last, setLast] = useState({ columnIndex: null, rowIndex: null });
  const [selectionPosition, setSelectionPosition] = useState({ left: 0, top: 0 });
  const columns = segmentSize.width / tileSize.width;
  const rows = segmentSize.height / tileSize.height;
  const scaleModifiedTileSize = {
    width: tileSize.width * zoomScaleModifier,
    height: tileSize.height * zoomScaleModifier,
  }

  const handleContextMenu = (e) => e.preventDefault();
  const handlePointerDown = (e) => {
    // set history collection start
    console.log('HISTORY: Start recording..');
    handlePointerEvent(e);
  };
  const handlePointerUp = (e) => {
    // set history collection  end
    console.log('HISTORY: End recording')
  };
  const handlePointerOver = (e) => handlePointerEvent(e);
  const handlePointerOut = (e) => null;

  const handlePointerEvent = (pointerEvent) => {
    const { pointerType, button, buttons, altKey, ctrlKey, shiftKey, target } = pointerEvent;
    const { columnIndex, rowIndex } = _targetIdToIndexes(target.id);
    pointerEvent.preventDefault();

    if (last.columnIndex !== columnIndex || last.rowIndex !== rowIndex) {
      setSelectionPosition({
        left: (scaleModifiedTileSize.width) * columnIndex,
        top: (scaleModifiedTileSize.height) * rowIndex,
      });

      setLast({ columnIndex, rowIndex })
    }

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
    styles.userInputNode,
    (currentTool === toolTypes.tileStamp) ? styles.tileStamp : null
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
                  width: scaleModifiedTileSize.width,
                  height: scaleModifiedTileSize.height,
                  left: (scaleModifiedTileSize.width) * columnIndex,
                  top: (scaleModifiedTileSize.height) * rowIndex,
                  cursor: toolConstants[currentTool].cursor || "auto"
                }}
                onContextMenu={handleContextMenu}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
              />
            )
          })
        }

        {
          (currentTool === toolTypes.tileStamp) &&
          <Selection tileSize={scaleModifiedTileSize} grid={tileSelectionGrid} position={selectionPosition} />
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
