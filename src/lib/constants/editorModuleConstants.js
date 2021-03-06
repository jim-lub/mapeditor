import { Suspense, lazy } from 'react';
import * as moduleTypes from './editorModuleTypes';

import {
  ColorPicker,
  Hints,
  History,
  Layers,
  Map,
  // Properties,
  TileSelector
} from 'views/components/Editor/modules';

export default {
  [ moduleTypes.colorPicker ]: {
    name: "Colors",
    Component:  ColorPicker
  },

  [ moduleTypes.hints ]: {
    name: "Hints",
    Component: Hints
  },

  [ moduleTypes.history ]: {
    name: "History",
    Component: History
  },

  [ moduleTypes.layers ]: {
    name: "Layers",
    Component: Layers
  },

  [ moduleTypes.map ]: {
    name: "Map",
    Component: Map
  },

  // [ moduleTypes.properties ]: {
  //   name: "Properties",
  //   Component: Properties
  // },

  [ moduleTypes.tileSelector ]: {
    name: "Selection",
    Component: TileSelector
  },

}
