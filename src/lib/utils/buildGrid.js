import _ from 'lodash';

export const buildGrid = ({ columns, rows, fill }) => (
  [...new Array( columns )].map((val, columnIndex) =>
    [...new Array( rows )].map((val, rowIndex) =>
      (_.isFunction(fill))
        ? fill({ columnIndex, rowIndex })
        : fill
    )
  )
)

export const buildEmptyGrid = ({ columns, rows }) => {
  const grid = new Array(columns);
  const copy = new Array(rows);

  for (let i = 0; i < rows; i++) {
      copy[i] = 0;
  }

  for (let i = 0; i < columns; i++) {
      grid[i] = copy.slice(0);
  }

  return grid;
}
