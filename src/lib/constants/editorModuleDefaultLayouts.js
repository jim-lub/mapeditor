import breakpoints from './breakpoints';
import * as moduleTypes from './editorModuleTypes';

export default {
  breakpoints,

  columns: {
    xxl: 100,
    // xl: 16,
    lg: 100,
    // md: 10,
    sm: 20,
    xs: 6,
  },

  rowHeight: 20
}

export const defaultLayout = {
  xxl: [
    {
      i: moduleTypes.colorPicker,
      x: 0, y: 0,
      w: 8, h: 10,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.layers,
      x: 0, y: 14,
      w: 8, h: 20,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.map,
      x: 8, y: 0,
      w: 62, h: 40,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.properties,
      x: 0, y: 34,
      w: 8, h: 6,
      minW: 8, minH: 6,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.tileSelector,
      x: 70, y: 0,
      w: 30, h: 40,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.toolbar,
      x: 0, y: 10,
      w: 8, h: 4,
      minW: 4, minH: 4,
      // maxW: 8, maxH: 4
    },
  ],

  lg: [
    {
      i: moduleTypes.colorPicker,
      x: 0, y: 0,
      w: 16, h: 10,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.layers,
      x: 0, y: 14,
      w: 16, h: 18,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.map,
      x: 16, y: 0,
      w: 54, h: 38,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.properties,
      x: 0, y: 32,
      w: 16, h: 6,
      minW: 8, minH: 6,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.tileSelector,
      x: 70, y: 0,
      w: 30, h: 38,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.toolbar,
      x: 0, y: 10,
      w: 16, h: 4,
      minW: 4, minH: 4,
      // maxW: 8, maxH: 4
    },
  ],

  sm: [
    {
      i: moduleTypes.colorPicker,
      x: 0, y: 15,
      w: 8, h: 10,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.layers,
      x: 8, y: 15,
      w: 9, h: 10,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.map,
      x: 0, y: 0,
      w: 20, h: 15,
      minW: 10, minH: 5,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.properties,
      x: 0, y: 35,
      w: 8, h: 10,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.tileSelector,
      x: 0, y: 25,
      w: 20, h: 10,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.toolbar,
      x: 17, y: 15,
      w: 3, h: 10,
      minW: 2, minH: 2,
      // maxW: 8, maxH: 4
    },
  ],
}
