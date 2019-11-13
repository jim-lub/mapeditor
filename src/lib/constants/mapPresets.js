export default {
  list: ['dev'],

  'dev': {
    name: 'development preset: fixed 64 by 64 pixels',
    allowedTileSizes: [64],
    segmentSize: {
      width: 512,
      height: 512
    }
  },

  'default': {
    name: 'default [512x512]',
    allowedTileSizes: [32, 64, 128, 256, 512],
    segmentSize: {
      width: 512,
      height: 512
    }
  }
}
