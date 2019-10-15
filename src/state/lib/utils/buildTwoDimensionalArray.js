export const buildTwoDimensionalArray = ({ columns, rows, mapFn }) => (
  [...new Array( columns )].map((val, columnIndex) =>
    [...new Array( rows )].map((val, rowIndex) =>
      (mapFn)
        ? mapFn({ columnIndex, rowIndex })
        : null
    )
  )
)
