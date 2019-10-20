export default {
  breakpoints: {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0
  },

  columns: {
    lg: 24,
    md: 20,
    sm: 12,
    xs: 8,
    xxs: 4
  },

  rowHeight: 30
}

const _modules = {
  'colorPicker': {
    // minW: 4,
    // maxW: 4,
    minH: 8,
    // maxH: 4
  }
}

export const defaultLayout = {
  lg: [
    {i: 'colorPicker', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker2', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker3', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
  ],
  md: [
    {i: 'colorPicker', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker2', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker3', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
  ],
  sm: [
    {i: 'colorPicker', x: 0, y: 0, w: 12, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker2', x: 0, y: 0, w: 12, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker3', x: 0, y: 0, w: 12, h: 8, ..._modules['colorPicker']},
  ],
  xs: [
    {i: 'colorPicker', x: 0, y: 0, w: 8, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker2', x: 0, y: 0, w: 8, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker3', x: 0, y: 0, w: 8, h: 8, ..._modules['colorPicker']},
  ],
  xxs: [
    {i: 'colorPicker', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker2', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
    {i: 'colorPicker3', x: 0, y: 0, w: 4, h: 8, ..._modules['colorPicker']},
  ],
}
