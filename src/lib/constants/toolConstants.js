import * as toolTypes from './toolTypes';

import { ReactComponent as paintBrushIcon } from 'assets/static/icons/editor/tools/paint-brush.svg';
import { ReactComponent as tileStampIcon } from 'assets/static/icons/editor/tools/tile-stamp.svg';
import { ReactComponent as eraserIcon } from 'assets/static/icons/editor/tools/eraser.svg';
import { ReactComponent as handIcon } from 'assets/static/icons/editor/tools/hand.svg';

export default {
  [ toolTypes.paintBrush ]: {
    name: "Paint Brush",
    description: "...",
    Icon: paintBrushIcon,
    keybinding: "P"
  },

  [ toolTypes.tileStamp ]: {
    name: "Tile stamp",
    description: "...",
    Icon: tileStampIcon,
    keybinding: "T"
  },

  [ toolTypes.eraser ]: {
    name: "Eraser",
    description: "...",
    Icon: eraserIcon,
    keybinding: "E"
  },

  [ toolTypes.hand ]: {
    name: "Hand",
    description: "...",
    Icon: handIcon,
    keybinding: "H"
  },
}
