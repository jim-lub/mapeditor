export const defaults = {
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

  rowHeight: 30,

  layouts: {
    lg: [
      {i: 'a', x: 0, y: 0, w: 4, h: 1},
      {i: 'b', x: 4, y: 0, w: 4, h: 1},
      {i: 'c', x: 8, y: 0, w: 4, h: 1}
    ],
    md: [
      {i: 'a', x: 0, y: 0, w: 3, h: 1},
      {i: 'b', x: 3, y: 0, w: 3, h: 1},
      {i: 'c', x: 6, y: 0, w: 4, h: 1}
    ],
    sm: [
      {i: 'a', x: 0, y: 0, w: 3, h: 1},
      {i: 'b', x: 3, y: 0, w: 3, h: 1},
      {i: 'c', x: 0, y: 2, w: 6, h: 1}
    ],
    xs: [
      {i: 'a', x: 0, y: 0, w: 4, h: 1},
      {i: 'b', x: 0, y: 2, w: 4, h: 1},
      {i: 'c', x: 0, y: 4, w: 4, h: 1}
    ],
    xxs: [
      {i: 'a', x: 0, y: 0, w: 2, h: 1},
      {i: 'b', x: 0, y: 2, w: 2, h: 1},
      {i: 'c', x: 0, y: 4, w: 2, h: 1}
    ]
  }
}
