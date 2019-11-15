export const buildGrid = ({ columns, rows, fill }) => (
  [...new Array( columns )].map((val, columnIndex) =>
    [...new Array( rows )].map((val, rowIndex) =>
      (typeof fill === "function")
        ? fill({ columnIndex, rowIndex })
        : fill
    )
  )
)
