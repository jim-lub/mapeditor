import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import { ModuleWrapper } from '../ModuleWrapper';
import { ColorPicker } from '../../workspace/ColorPicker';

import defaults, { defaultLayout } from 'lib/constants/editorLayouts';

export default () => {
  return (
    <AutoSizer>
      {({ width, height }) => {
        // console.log(width, height)

        return (
          <ResponsiveGridLayout
            className="layout"
            layouts={defaultLayout}
            width={width}
            margin={[2, 2]}
            rowHeight={defaults.rowHeight}
            breakpoints={defaults.breakpoints}
            cols={defaults.columns}
            draggableHandle=".moduleDragHandle"
          >
            <div key="colorPicker">
              <ModuleWrapper displayName="Color Picker">
                <ColorPicker />
              </ModuleWrapper>
            </div>
            <div key="colorPicker2">
              <ModuleWrapper displayName="Color Picker">
                <ColorPicker />
              </ModuleWrapper>
            </div>
            <div key="colorPicker3">
              <ModuleWrapper displayName="Color Picker longer name">
                <ColorPicker />
              </ModuleWrapper>
            </div>
          </ResponsiveGridLayout>
        )
      }}
    </AutoSizer>
  )
}
