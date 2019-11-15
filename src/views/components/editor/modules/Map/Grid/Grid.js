import React from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

export default ({ mapProperties, zoomScaleModifier, children }) => {
  const columnCount = mapProperties.mapSize.columns;
  const rowCount = mapProperties.mapSize.rows;
  const columnWidth = mapProperties.segmentSize.width * zoomScaleModifier;
  const rowHeight = mapProperties.segmentSize.height * zoomScaleModifier;

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          width={width}
          height={(height)}
        >
          {children}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}
