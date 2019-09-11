import { uuid } from 'lib/utils/UUID';

export const buildMapGrid = ({ mapProperties, firestoreMapGrid }) => {
  const { mapSize } = mapProperties;

  return [...new Array( mapSize.columns )].map((val, columnIndex) => {
    return [...new Array( mapSize.rows )].map((val, rowIndex) => {
      const uuid_prefix = `S3G-${columnIndex}${rowIndex}-`;

      if (firestoreMapGrid[columnIndex]) {
        if (firestoreMapGrid[columnIndex][rowIndex]) {
          return firestoreMapGrid[columnIndex][rowIndex];
        }
      }

      return uuid.create( uuid_prefix );
    })
  });
}
