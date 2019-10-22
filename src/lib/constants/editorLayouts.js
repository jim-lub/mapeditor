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
    xxl: 24,
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
    {i: 'colorPicker', x: 0, y: 0, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 0, y: 1, w: 2, h: 14, minW: 2, minH: 8},
    {i: 'map', x: 2, y: 0, w: 22, h: 25, minW: 2, minH: 5},
  ],
  xl: [
    {i: 'colorPicker', x: 0, y: 0, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 0, y: 1, w: 2, h: 14, minW: 2, minH: 8},
    {i: 'map', x: 2, y: 0, w: 14, h: 25, minW: 2, minH: 5},
  ],
  lg: [
    {i: 'colorPicker', x: 0, y: 0, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 0, y: 1, w: 2, h: 14, minW: 2, minH: 8},
    {i: 'map', x: 2, y: 0, w: 10, h: 25, minW: 2, minH: 5},
  ],
  md: [
    {i: 'colorPicker', x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'map', x: 0, y: 0, w: 10, h: 25, minW: 2, minH: 5},
  ],
  sm: [
    {i: 'colorPicker', x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'map', x: 0, y: 0, w: 8, h: 25, minW: 2, minH: 5},
  ],
  xs: [
    {i: 'colorPicker', x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'map', x: 0, y: 0, w: 6, h: 25, minW: 2, minH: 5},
  ],
  xxs: [
    {i: 'colorPicker', x: 0, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'layers', x: 2, y: 1, w: 2, h: 8, minW: 2, minH: 8},
    {i: 'map', x: 0, y: 0, w: 4, h: 25, minW: 2, minH: 5},
  ],
}
