import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { SelectableGroup } from 'react-selectable-fast';

import {
  getActiveLayerId,
  getLayerPropertiesById
} from 'state/ducks/editor/layers';

import { getTilesetById } from 'state/ducks/editor/tilesets';

import {
  getCurrentTool,
  getZoomScaleModifier
} from 'state/ducks/editor/tools';

import {
  createPattern,
  clearPattern
} from 'state/ducks/editor/user-input'

import { disableAllEditorInput } from 'state/ducks/editor';

import { useKeyPress } from 'lib/hooks';
import * as moduleTypes from 'lib/constants/editorModuleTypes';
import * as layerTypes from 'lib/constants/layerTypes';
import * as toolTypes from 'lib/constants/toolTypes';

import { NoTilesetLayerNotification } from 'views/components/Editor/components';
import { Loader } from 'views/components/Loader';
import { Actionbar } from './Actionbar';
import SelectableTile from './SelectableTile';

import styles from './tileselector.module.css';

const Component = ({ contentWidth, contentHeight, activeLayerId, layerProperties, tileset, currentTool, zoomScaleModifier, disableAllInput, actions }) => {
  const [lastActiveLayerId, setLastActiveLayerId] = useState(null);
  const selectionRef = useRef();
  const { image, imageSize, tileSize, selectableGrid } = tileset;

  useEffect(() => {
    if (activeLayerId !== lastActiveLayerId) {
      if (selectionRef.current) {
        selectionRef.current.clearSelection();
      }
      setLastActiveLayerId(activeLayerId);
    }
  }, [activeLayerId, lastActiveLayerId])

  useEffect(() => {
    if (!selectionRef.current) return;

    if (currentTool !== toolTypes.tileStamp) {
      selectionRef.current.clearSelection();
      actions.clearPattern();
    }
  }, [currentTool, actions])

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
    actions.createPattern({
      layerType: layerTypes.tileset,
      selection: selected.map(({ props: { columnIndex, rowIndex } }) => ({ columnIndex, rowIndex }))
    })
  }

  const handleSelectionClear = () => actions.clearPattern();

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

  if (!activeLayerId || layerProperties.layerType !== layerTypes.tileset) {
    return (
      <div style={{width: contentWidth, height: contentHeight, overflow: 'auto'}}>
        <NoTilesetLayerNotification width={contentWidth / 1.5} height={contentHeight / 1.5} />
      </div>
    )
  }

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
                      backgroundSize: `${scaleModifiedImageSize.width}px ${scaleModifiedImageSize.height}px`,
                      cursor: (currentTool === toolTypes.tileStamp) ? "auto" : "not-allowed"
                  }}>
                    <SelectableGroup
                      ref={selectionRef}
                      onSelectionFinish={handleSelectionFinish}
                      onSelectionClear={handleSelectionClear}
                      selectboxClassName={styles.selectBox}
                      resetOnStart={(addToSelectionKeyPressed) ? false : true}
                      enableDeselect
                      disabled={(currentTool === toolTypes.tileStamp) ? false : true}
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
    layerProperties: getLayerPropertiesById(state, { layerId: getActiveLayerId(state) }),
    tileset: getTilesetById(state, { tilesetId: 'randomtilesetid' }),
    currentTool: getCurrentTool(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.tileSelector }),
    disableAllInput: disableAllEditorInput(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createPattern, clearPattern }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
