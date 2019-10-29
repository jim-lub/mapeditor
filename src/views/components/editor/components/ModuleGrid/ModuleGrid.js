import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import { ModuleWrapper } from '../ModuleWrapper';

import defaults, { defaultLayout } from 'lib/constants/editorModuleDefaultLayouts';

export default ({ modules }) => {
  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <ResponsiveGridLayout
            className="layout"
            layouts={defaultLayout}
            width={(width - 17)}
            margin={[5, 5]}
            rowHeight={defaults.rowHeight}
            breakpoints={defaults.breakpoints}
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
