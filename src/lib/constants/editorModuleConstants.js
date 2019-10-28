import * as moduleTypes from './editorModuleTypes';

import {
  ColorPicker,
  Layers,
  Map,
  Properties,
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

  [ moduleTypes.toolbar ]: {
    name: "Tools",
    Component: Toolbar
  },
}
