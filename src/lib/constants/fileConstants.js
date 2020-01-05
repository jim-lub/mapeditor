import * as fileTypes from './fileTypes';

import fileIcon from 'assets/static/icons/file-types/file.png'
import jsonIcon from 'assets/static/icons/file-types/json.png'
import imageIcon from 'assets/static/icons/file-types/png.png'

export default {
  [ fileTypes.icon ]: {
    extension: ".icon",
    icon: imageIcon,
    storage: {
      limits: {
        size: undefined,
        height: undefined,
        width: undefined,
        extensions: ['.png', '.jpg', '.jpeg']
      }
    },
  },

  [ fileTypes.map ]: {
    extension: ".map",
    icon: jsonIcon,
  },

  [ fileTypes.prefab ]: {
    extension: ".prefab",
    icon: fileIcon,
  },

  [ fileTypes.spritesheet ]: {
    extension: ".sprite",
    icon: imageIcon,
    storage: {
      limits: {
        size: undefined,
        height: undefined,
        width: undefined,
        extensions: ['.png', '.jpg', '.jpeg']
      }
    },
  },

  [ fileTypes.tileset ]: {
    extension: ".tileset",
    icon: imageIcon,
    storage: {
      limits: {
        size: undefined,
        height: undefined,
        width: undefined,
        extensions: ['.png', '.jpg', '.jpeg']
      }
    },
  },
}
