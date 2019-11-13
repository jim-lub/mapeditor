import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createLayer,
  getCreatedLayersCount
} from 'state/ducks/editor/layers';

import mapPresets from 'lib/constants/mapPresets';
import * as layerTypes from 'lib/constants/layerTypes';
import layerConstants from 'lib/constants/layerConstants';

import tilesetImageConfig from 'lib/constants/__dev__/tilesetImageConfig';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';

import styles from '../modal.module.css';

const Component = ({ actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateTileWidth, setFieldStateTileWidth] = useState();
  const [fieldStateTileHeight, setFieldStateTileHeight] = useState();
  const [fieldStateLayerType, setFieldStateLayerType] = useState({});

  const handleSubmit = () => {
    actions.createLayer({
      layerName: fieldStateName.value,
      layerType: fieldStateLayerType.value,
      tileSize: {
        width: fieldStateTileWidth.value,
        height: fieldStateTileHeight.value
      }
    });
    onClose();
  }

  const layerTypeOptions = () => Object.values(layerTypes)
    .map(layerType => {
      const layerProperties = layerConstants[layerType];

      return {
        name: layerProperties.name,
        value: layerType,
        disabled: layerProperties.disabled
      }
    });

  const tileSizeOptions = () => Object.values(mapPresets['dev'].allowedTileSizes)
    .map(tileSize => {
      return {
        name: tileSize,
        value: tileSize,
      }
    });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.warning}>
          Tilesize fixed at 64 by 64 pixels until the tileset uploader is complete
        </div>

        <div className={styles.form}>
          <Form.Group id="createLayerForm" onSubmit={handleSubmit}>

            <Field.Text
              name="layerName"
              label="Name"
              onStateChange={setFieldStateName}
              autoFocus={true}
            />

            <Field.Select
              name="layerType"
              label="Type"
              options={layerTypeOptions()}
              onStateChange={setFieldStateLayerType}
            />

            <Field.Select
              name="layerTileSizeWidth"
              label="Tile width"
              options={tileSizeOptions()}
              onStateChange={setFieldStateTileWidth}
            />

            <Field.Select
              name="layerTileSizeHeight"
              label="Tile height"
              options={tileSizeOptions()}
              onStateChange={setFieldStateTileHeight}
            />

            {
              (fieldStateLayerType.hasOwnProperty('value')) &&
              (fieldStateLayerType.value === layerTypes.tileset) &&
              <Field.Text
                name="layerName"
                label="Tileset"
                initialValue={tilesetImageConfig.name}
                disabled={true}
              />
            }
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Create", color: "blue", form: "createLayerForm" }}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createLayer }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);
