import * as moduleTypes from './editorModuleTypes';

import {
  ColorPicker,
  Layers,
  Map,
  Properties,
  TileSelector,
  Toolbar
} from 'views/components/Editor/modules';

export default {
  [ moduleTypes.colorPicker ]: {
    name: "Colors",
    Component:  ColorPicker
  },

  [ moduleTypes.layers ]: {
    name: "Layers",
    Component: Layers
  },

  [ moduleTypes.map ]: {
    name: "Map",
    Component: Map
  },

  [ moduleTypes.properties ]: {
    name: "Properties",
    Component: Properties
  },

  [ moduleTypes.tileSelector ]: {
    name: "Selection",
    Component: TileSelector
  },

  [ moduleTypes.toolbar ]: {
    name: "Tools",
    Component: Toolbar
  },
}
