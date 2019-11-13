import tilesetImage from 'assets/static/tilesets/DevMap@64x64.png';

export default {
  name: 'DevMap@64x64',
  description: '',
  image: tilesetImage,

  imageSize: {
    width: 2048,
    height: 2048
  },

  tileSize: {
    width: 64,
    height: 64
  },

  prefabs: [
    {
      name: 'house',
      pattern: []
    }
  ]
}
