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
