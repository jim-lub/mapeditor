import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { buildTwoDimensionalArray } from 'lib/utils';

import { setTileValue } from 'state/ducks/editor/tools';

import tilesetImage from 'assets/static/tilesets/TownColor2@64x64.png';

import styles from './tileselector.module.css';

const Component = ({ contentWidth, contentHeight, actions }) => {
  const tilesetSize = { width: 1024, height: 1024 };
  const tileSize = { width: 64, height: 64 };
  const onPointerEvent = ({ columnIndex, rowIndex }) => {
    actions.setTileValue({ columnIndex, rowIndex })
  }

  const columns = tilesetSize.width / tileSize.width;
  const rows = tilesetSize.height / tileSize.height;

  const handleContextMenu = (e) => e.preventDefault();
  const handlePointerDown = (e) => handlePointerEvent(e);
  // const handlePointerOver = (e) => handlePointerEvent(e);

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

  return (
    <div className={styles.userInputWrapperOuter} style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.userInputWrapperInner} style={{width: tilesetSize.width, height: tilesetSize.height, backgroundImage: `url(${tilesetImage})`}}>
        {
          buildTwoDimensionalArray({
            columns, rows,
            mapFn: ({ columnIndex, rowIndex }) => (
              <div
                key={`${columnIndex}-${rowIndex}`}
                id={`inputNode-${columnIndex}-${rowIndex}`}
                className={styles.userInputNode}
                style={{
                  width: tileSize.width,
                  height: tileSize.height,
                  left: (tileSize.width) * columnIndex,
                  top: (tileSize.height) * rowIndex,
                }}
                onContextMenu={handleContextMenu}
                onPointerDown={handlePointerDown}
              >
                { columnIndex }, { rowIndex }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setTileValue }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

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
})
