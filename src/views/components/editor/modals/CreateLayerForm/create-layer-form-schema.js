import * as validationTypes from 'lib/constants/validationTypes';

import mapPresets from 'lib/constants/mapPresets';
import * as layerTypes from 'lib/constants/layerTypes';
import layerConstants from 'lib/constants/layerConstants';

export default () => ([
  {
    stepName: 'default',
    fields: {
      'layer-name': {
        fieldLabel: 'Layer name',
        placeholder: 'Name'
      },

      'layer-type': {
        fieldLabel: 'Layer Type',
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
        fieldLabel: 'Tile size (width)',
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
        fieldLabel: 'Tile size (height)',
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
    },
  }
]);
