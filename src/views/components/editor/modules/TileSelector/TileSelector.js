import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectableGroup } from 'react-selectable-fast';

import { useKeyPress } from 'lib/hooks';
import { buildTwoDimensionalArray } from 'lib/utils';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import {
  getZoomScaleModifier,
  setTileSelection,
  clearTileSelection,
} from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { Actionbar } from './Actionbar';
import SelectableTile from './SelectableTile';

import tilesetImageConfig from 'lib/constants/__dev__/tilesetImageConfig';

import styles from './tileselector.module.css';

const Component = ({ contentWidth, contentHeight, zoomScaleModifier, disableAllInput, actions }) => {
  const { image, imageSize, tileSize } = tilesetImageConfig;
  const scaleModifiedImageSize = {
    width: imageSize.width * zoomScaleModifier,
    height: imageSize.height * zoomScaleModifier
  }

  const scaleModifiedTileSize = {
    width: tileSize.width * zoomScaleModifier,
    height: tileSize.height * zoomScaleModifier
  }
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
          tileSize={scaleModifiedTileSize}
          position={{
            left: scaleModifiedTileSize.width * columnIndex,
            top: scaleModifiedTileSize.height * rowIndex,
          }}
        />
      )
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionbar}>
        <Actionbar disabled={disableAllInput}/>
      </div>

      <div className={styles.segments}>
        <div className={styles.overflowContainer} style={{width: contentWidth, height: contentHeight - 42}}>
          <div
            className={styles.selectableContainer}
            style={{
              width: scaleModifiedImageSize.width,
              height: scaleModifiedImageSize.height,
              backgroundImage: `url(${image})`,
              backgroundSize: `${scaleModifiedImageSize.width}px ${scaleModifiedImageSize.height}px`
          }}>
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
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.tileSelector }),
    disableAllInput: isAllEditorInputDisabled(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setTileSelection, clearTileSelection }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
