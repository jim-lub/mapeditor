import tilesetImage from 'assets/static/tilesets/TownColor2@64x64.png';

export default {
  name: 'TownColor2@64x64',
  description: '',
  image: tilesetImage,

  imageSize: {
    width: 1024,
    height: 1024
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
