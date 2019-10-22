import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import { ModuleWrapper } from '../ModuleWrapper';

import defaults, { defaultLayout } from 'lib/constants/editorLayouts';

export default ({ modules, isScrollable }) => {
  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <ResponsiveGridLayout
            className="layout"
            layouts={defaultLayout}
            width={(width - ((isScrollable) ? 17 : 0))}
            margin={[2, 2]}
            rowHeight={defaults.rowHeight}
            breakpoints={defaults.breakpoints}
            cols={defaults.columns}
            draggableHandle=".moduleDragHandle"
          >
            {
              modules.map(({ key, displayName, Component}) => (
                <div key={key}>
                  <ModuleWrapper displayName={displayName}>
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
