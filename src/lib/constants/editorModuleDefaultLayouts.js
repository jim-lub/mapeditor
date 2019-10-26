import * as moduleTypes from './editorModuleTypes';

export default {
  breakpoints: {
    xxl: 2000,
    xl: 1600,
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0
  },

  columns: {
    xxl: 100,
    xl: 16,
    lg: 12,
    md: 10,
    sm: 8,
    xs: 6,
    xxs: 4
  },

  rowHeight: 30
}

export const defaultLayout = {
  xxl: [
    {i: moduleTypes.colorPicker, x: 0, y: 0, w: 6, h: 6, minW: 4, minH: 4 },
    {i: moduleTypes.layers, x: 0, y: 6, w: 6, h: 12, minW: 4, minH: 5 },
    {i: moduleTypes.map, x: 8, y: 0, w: 92, h: 24, minW: 4, minH: 4 },
    {i: moduleTypes.properties, x: 0, y: 18, w: 6, h: 6, minW: 4, minH: 4 },
  ],
  xl: [
    {i: moduleTypes.colorPicker, x: 0, y: 0, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.layers, x: 0, y: 1, w: 2, h: 14, minW: 2, minH: 5},
    {i: moduleTypes.map, x: 3, y: 0, w: 13, h: 25, minW: 2, minH: 5},
    {i: moduleTypes.properties, x: 0, y: 16, w: 2, h: 8, minW: 2, minH: 5},
  ],
  lg: [
    {i: moduleTypes.colorPicker, x: 0, y: 0, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.layers, x: 0, y: 1, w: 2, h: 14, minW: 2, minH: 5},
    {i: moduleTypes.map, x: 2, y: 0, w: 10, h: 25, minW: 2, minH: 5},
    {i: moduleTypes.properties, x: 0, y: 16, w: 2, h: 8, minW: 2, minH: 5},
  ],
  md: [
    {i: moduleTypes.colorPicker, x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.layers, x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.map, x: 0, y: 0, w: 10, h: 25, minW: 2, minH: 5},
    {i: moduleTypes.properties, x: 4, y: 1, w: 2, h: 8, minW: 2, minH: 5},
  ],
  sm: [
    {i: moduleTypes.colorPicker, x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.layers, x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.map, x: 0, y: 0, w: 8, h: 25, minW: 2, minH: 5},
    {i: moduleTypes.properties, x: 4, y: 1, w: 2, h: 8, minW: 2, minH: 5},
  ],
  xs: [
    {i: moduleTypes.colorPicker, x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.layers, x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.map, x: 0, y: 0, w: 6, h: 25, minW: 2, minH: 5},
    {i: moduleTypes.properties, x: 4, y: 1, w: 2, h: 8, minW: 2, minH: 5},
  ],
  xxs: [
    {i: moduleTypes.colorPicker, x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.layers, x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 5},
    {i: moduleTypes.map, x: 0, y: 0, w: 4, h: 25, minW: 2, minH: 5},
    {i: moduleTypes.properties, x: 4, y: 2, w: 2, h: 8, minW: 2, minH: 5},
  ],
}
