import React, { useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import { ModuleWrapper } from '../ModuleWrapper';

import defaults, { defaultLayout } from 'lib/constants/editorModuleDefaultLayouts';

export default ({ modules, hasScrollbar }) => {
  const [scrollbar, setScrollbar] = useState( hasScrollbar() );

  const handleResize = () => {
    setScrollbar( hasScrollbar() )
  }

  return (
    <AutoSizer>
      {({ width, height }) => {

        const rowHeight = (height - 510) / 100;
        const gridWidth = (scrollbar) ? width - 17 : width;

        return (
          <ResponsiveGridLayout
            className="layout"
            layouts={defaultLayout}
            width={gridWidth}
            margin={[5, 5]}
            rowHeight={rowHeight}
            breakpoints={defaults.breakpoints}
            onResizeStop={handleResize}
            cols={defaults.columns}
            draggableHandle=".moduleDragHandle"
          >
            {
              modules.map(({ type, name, Icon, Component}) => (
                <div key={type}>
                  <ModuleWrapper name={name} Icon={Icon}>
                    <Component />
                  </ModuleWrapper>
                </div>
              ))
            }
          </ResponsiveGridLayout>
        )
      }}
    </AutoSizer>
  )
}
