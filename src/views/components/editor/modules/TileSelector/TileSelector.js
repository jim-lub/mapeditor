import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectableGroup } from 'react-selectable-fast';

import { useKeyPress } from 'lib/hooks';
import { buildTwoDimensionalArray } from 'lib/utils';

import {
  setTileValue,
  getTileValue
} from 'state/ducks/editor/tools';

import SelectableTile from './SelectableTile';

import tilesetImageConfig from 'lib/constants/__dev__/tilesetImageConfig';

import styles from './tileselector.module.css';

const Component = ({ contentWidth, contentHeight }) => {
  const { image, imageSize, tileSize } = tilesetImageConfig;
  const ctrlKeyPressed = useKeyPress('s');

  const handleSelectionFinish = (data) => {
    console.log(data.map(({ props: { columnIndex, rowIndex } }) => {
      return [columnIndex, rowIndex]
    }))
  }

  const handleSelectionClear = () => {

  }

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
          resetOnStart={(ctrlKeyPressed) ? false : true}
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
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
