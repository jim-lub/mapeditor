import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectableGroup } from 'react-selectable-fast';

import { useKeyPress } from 'lib/hooks';
import { buildTwoDimensionalArray } from 'lib/utils';

import {
  setTileSelection,
  clearTileSelection
} from 'state/ducks/editor/tools';

import SelectableTile from './SelectableTile';

import tilesetImageConfig from 'lib/constants/__dev__/tilesetImageConfig';

import styles from './tileselector.module.css';

const Component = ({ contentWidth, contentHeight, actions }) => {
  const { image, imageSize, tileSize } = tilesetImageConfig;
  const addToSelectionKeyPressed = useKeyPress('s');

  const handleSelectionFinish = (selected) => {
    actions.setTileSelection({
      selected: selected.map(({ props: { columnIndex, rowIndex } }) => ({ columnIndex, rowIndex }))
    })
  }

  const handleSelectionClear = () => actions.clearTileSelection();

  const selectables = () => {
    const columns = imageSize.width / tileSize.width;
    const rows = imageSize.height / tileSize.height;

    return buildTwoDimensionalArray({
      columns, rows,
      mapFn: ({ columnIndex, rowIndex }) => (
        <SelectableTile
          key={columnIndex + rowIndex}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          tileSize={tileSize}
          position={{
            left: tileSize.width * columnIndex,
            top: tileSize.height * rowIndex,
          }}
        />
      )
    })
  }

  return (
    <div className={styles.overflowContainer} style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.selectableContainer} style={{width: imageSize.width, height: imageSize.height, backgroundImage: `url(${image})`}}>
        <SelectableGroup
          onSelectionFinish={handleSelectionFinish}
          onSelectionClear={handleSelectionClear}
          selectboxClassName={styles.selectBox}
          resetOnStart={(addToSelectionKeyPressed) ? false : true}
          enableDeselect
        >
          { selectables() }
        </SelectableGroup>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setTileSelection, clearTileSelection }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
