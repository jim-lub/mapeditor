import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { SelectableGroup } from 'react-selectable-fast';

import { useKeyPress } from 'lib/hooks';
import { buildTwoDimensionalArray } from 'lib/utils';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import {
  getZoomScaleModifier,
  setTileSelection,
  clearTileSelection,
} from 'state/ducks/editor/tools';

import {
  getActiveLayerId,
  getLayerPropertiesById
} from 'state/ducks/editor/layers';

import {
  getTilesetById
} from 'state/ducks/editor/tilesets';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import * as layerTypes from 'lib/constants/layerTypes';

import { Loader } from 'views/components/Loader';
import { Actionbar } from './Actionbar';
import SelectableTile from './SelectableTile';

import styles from './tileselector.module.css';

const Component = ({ contentWidth, contentHeight, activeLayerId, tileset, zoomScaleModifier, disableAllInput, actions }) => {
  const { image, imageSize, tileSize, selectableGrid } = tileset;
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
    return selectableGrid.map((column, columnIndex) => (
      column.map((row, rowIndex) => (
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
      ))
    ))
  }

  // if (!activeLayerId) {
  //   return (
  //     <Loader.Overlay />
  //   )
  // }

  return (
    <div className={styles.wrapper} style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.actionbar}>
        <Actionbar disabled={disableAllInput}/>
      </div>

      <div className={styles.segments}>
        {
          <AutoSizer>
            {({ width, height }) => {
              return (
                <>
                <div className={styles.overflowContainer} style={{width, height}}>
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
                { (disableAllInput) && <Loader.Overlay /> }
                </>
              )
            }}
          </AutoSizer>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeLayerId: getActiveLayerId(state),
    tileset: getTilesetById(state, { tilesetId: 'randomtilesetid' }),
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
