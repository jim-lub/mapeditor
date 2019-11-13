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
  }
}

export const defaultLayout = {
  xxl: [
    {
      i: moduleTypes.colorPicker,
      x: 0, y: 0,
      w: 8, h: 25,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.layers,
      x: 0, y: 25,
      w: 8, h: 35,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.map,
      x: 8, y: 0,
      w: 62, h: 100,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.hints,
      x: 0, y: 80,
      w: 8, h: 20,
      minW: 8, minH: 6,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.history,
      x: 0, y: 60,
      w: 8, h: 20,
      minW: 8, minH: 6,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.tileSelector,
      x: 70, y: 0,
      w: 30, h: 100,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
  ],

  lg: [
    {
      i: moduleTypes.colorPicker,
      x: 0, y: 0,
      w: 16, h: 25,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.layers,
      x: 0, y: 25,
      w: 16, h: 35,
      minW: 4, minH: 8,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.map,
      x: 16, y: 0,
      w: 54, h: 100,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.hints,
      x: 0, y: 80,
      w: 16, h: 20,
      minW: 8, minH: 6,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.history,
      x: 0, y: 60,
      w: 16, h: 20,
      minW: 8, minH: 6,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.tileSelector,
      x: 70, y: 0,
      w: 30, h: 100,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
  ],

  sm: [
    {
      i: moduleTypes.colorPicker,
      x: 0, y: 50,
      w: 10, h: 35,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.layers,
      x: 10, y: 50,
      w: 10, h: 35,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.map,
      x: 0, y: 0,
      w: 20, h: 50,
      minW: 10, minH: 5,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.hints,
      x: 0, y: 125,
      w: 10, h: 30,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.history,
      x: 10, y: 125,
      w: 10, h: 30,
      minW: 2, minH: 2,
      // maxW: 0, maxH: 0
    },
    {
      i: moduleTypes.tileSelector,
      x: 0, y: 85,
      w: 20, h: 40,
      minW: 10, minH: 10,
      // maxW: 0, maxH: 0
    },
  ],
}
