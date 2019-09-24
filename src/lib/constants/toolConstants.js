import * as toolTypes from './toolTypes';
import * as layerTypes from './layerTypes';

import { ReactComponent as paintBrushIcon } from 'assets/static/icons/editor/tools/paint-brush.svg';
import { ReactComponent as tileStampIcon } from 'assets/static/icons/editor/tools/tile-stamp.svg';
import { ReactComponent as eraserIcon } from 'assets/static/icons/editor/tools/eraser.svg';
import { ReactComponent as eyedropperIcon } from 'assets/static/icons/editor/tools/eye-dropper.svg';

export default {
  [ toolTypes.paintBrush ]: {
    name: "Paint Brush",
    description: "...",
    icon: paintBrushIcon,
    keybinding: "P",
    cursor: "copy",
    isAllowedOnLayers: [ layerTypes.color ],
  },

  [ toolTypes.tileStamp ]: {
    name: "Tile stamp",
    description: "...",
    icon: tileStampIcon,
    keybinding: "T",
    cursor: "copy",
    isAllowedOnLayers: [ layerTypes.tileset ],
  },

  [ toolTypes.eraser ]: {
    name: "Eraser",
    description: "...",
    icon: eraserIcon,
    keybinding: "E",
    cursor: "pointer",
    isAllowedOnLayers: [ layerTypes.color, layerTypes.tileset, layerTypes.collision ],
  },

  [ toolTypes.eyeDropper ]: {
    name: "Eye dropper",
    description: "...",
    icon: eyedropperIcon,
    keybinding: "I",
    cursor: "alias",
    isAllowedOnLayers: [ layerTypes.color ],
  },
}
