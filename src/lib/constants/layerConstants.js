import * as layerTypes from './layerTypes';

import { ReactComponent as colorIcon } from 'assets/static/icons/editor/layer-types/color.svg';
import { ReactComponent as tilesetIcon } from 'assets/static/icons/editor/layer-types/tileset.svg';
import { ReactComponent as collisionIcon } from 'assets/static/icons/editor/layer-types/collision.svg';

export default {
  [ layerTypes.color ]: {
    name: "Color",
    description: "...",
    defaultNewLayerName: "Color Layer #",
    disabled: false,
    icon: colorIcon
  },

  [ layerTypes.tileset ]: {
    name: "Tileset",
    description: "...",
    defaultNewLayerName: "Tileset Layer #",
    disabled: false,
    icon: tilesetIcon
  },

  [ layerTypes.collision ]: {
    name: "Collision",
    description: "...",
    defaultNewLayerName: "Collision Layer #",
    disabled: false,
    icon: collisionIcon
  },
}
