import * as toolTypes from './toolTypes';
import * as layerTypes from './layerTypes';

import { ReactComponent as paintBrushIcon } from 'assets/static/icons/editor/tools/paint-brush.svg';
import { ReactComponent as tileStampIcon } from 'assets/static/icons/editor/tools/tile-stamp.svg';
import { ReactComponent as eraserIcon } from 'assets/static/icons/editor/tools/eraser.svg';
import { ReactComponent as handIcon } from 'assets/static/icons/editor/tools/hand.svg';
import { ReactComponent as eyedropperIcon } from 'assets/static/icons/editor/tools/eye-dropper.svg';

export default {
  [ toolTypes.paintBrush ]: {
    name: "Paint Brush",
    description: "...",
    icon: paintBrushIcon,
    keybinding: "P",
    onLayers: [ layerTypes.color ],
    isActiveOnLayers: [ layerTypes.color ],
  },

  [ toolTypes.tileStamp ]: {
    name: "Tile stamp",
    description: "...",
    icon: tileStampIcon,
    keybinding: "T",
    onLayers: [ layerTypes.tileset ],
    isActiveOnLayers: [ layerTypes.tileset ],
  },

  [ toolTypes.eraser ]: {
    name: "Eraser",
    description: "...",
    icon: eraserIcon,
    keybinding: "E",
    onLayers: [ layerTypes.color, layerTypes.tileset, layerTypes.collision ],
    isActiveOnLayers: [ layerTypes.color, layerTypes.tileset, layerTypes.collision ],
  },

  [ toolTypes.hand ]: {
    name: "Hand",
    description: "...",
    icon: handIcon,
    keybinding: "H",
    onLayers: [ layerTypes.color, layerTypes.tileset, layerTypes.collision ],
    isActiveOnLayers: [ layerTypes.color, layerTypes.tileset, layerTypes.collision ],
  },

  [ toolTypes.eyedropper ]: {
    name: "Eye dropper",
    description: "...",
    icon: eyedropperIcon,
    keybinding: "E",
    onLayers: [ layerTypes.color ],
    isActiveOnLayers: [ layerTypes.color ],
  },
}
