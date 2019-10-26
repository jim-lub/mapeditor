import * as moduleTypes from './editorModuleTypes';

import {
  ColorPicker,
  Layers,
  Map,
  Properties
} from 'views/components/Editor/modules';

import { ReactComponent as colorPickerIcon } from 'assets/static/icons/editor/modules/color-picker.svg';
import { ReactComponent as layersIcon } from 'assets/static/icons/editor/modules/layers.svg';
import { ReactComponent as propertiesIcon } from 'assets/static/icons/editor/modules/properties.svg';
import { ReactComponent as mapIcon } from 'assets/static/icons/editor/modules/map.svg';

export default {
  [ moduleTypes.colorPicker ]: {
    name: "Colors",
    Icon: colorPickerIcon,
    Component:  ColorPicker
  },

  [ moduleTypes.layers ]: {
    name: "Layers",
    Icon: layersIcon,
    Component: Layers
  },

  [ moduleTypes.map ]: {
    name: "Map",
    Icon: mapIcon,
    Component: Map
  },

  [ moduleTypes.properties ]: {
    name: "Properties",
    Icon: propertiesIcon,
    Component: Properties
  },
}
