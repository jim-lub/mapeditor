import { createReducer } from 'state/lib/utils';

import * as selectors from './selectors';

import { buildTwoDimensionalArray } from 'lib/utils';
import tilesetImageConfig from 'lib/constants/__dev__/tilesetImageConfig';
const { name, description, image, imageSize, tileSize } = tilesetImageConfig;

const selectables = () => {
  const columns = imageSize.width / tileSize.width;
  const rows = imageSize.height / tileSize.height;

  return buildTwoDimensionalArray({
    columns, rows,
    mapFn: null
  })
}

const initialState = {
  collection: {
    'randomtilesetid': {
      name,
      description,
      image,
      imageSize,
      tileSize,
      selectableGrid: selectables()
    }
  }
}

export default createReducer( initialState )({

});

/*** operations ***/

/*** selectors ***/
export const getTilesetById = selectors.getTilesetById;
