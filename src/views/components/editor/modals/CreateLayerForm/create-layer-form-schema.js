import * as fieldTypes from 'lib/constants/fieldTypes';
import * as validationTypes from 'lib/constants/validationTypes';

import mapPresets from 'lib/constants/mapPresets';
import * as layerTypes from 'lib/constants/layerTypes';
import layerConstants from 'lib/constants/layerConstants';

export default () => ({
  type: 'form/SINGLE_STEP',

  fields: {
    'layer-name': {
      type: fieldTypes.text,
      label: 'Layer name',
      placeholder: 'Name'
    },

    'layer-type': {
      type: fieldTypes.select,
      label: 'Layer Type',
      options: [
        ...Object.values(layerTypes)
          .map(layerType => {
            const layerProperties = layerConstants[layerType];

            return {
              label: layerProperties.name,
              value: layerType,
              disabled: layerProperties.disabled
            }
          })
      ],
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
      ]
    },

    'tile-size-width': {
      type: fieldTypes.select,
      label: 'Tile Size',
      options: [
        ...Object.values(mapPresets['dev'].allowedTileSizes)
          .map(tileSize => {
            return {
              label: tileSize,
              value: tileSize,
            }
          })
      ],
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
      ]
    },

    'tile-size-height': {
      type: fieldTypes.select,
      label: '__sharelabelwith:tile-size-width',
      options: [
        ...Object.values(mapPresets['dev'].allowedTileSizes)
          .map(tileSize => {
            return {
              label: tileSize,
              value: tileSize,
            }
          })
      ],
      validation: [
        {
          type: validationTypes.required,
          message: 'Field is required'
        },
      ]
    },
  }
});
