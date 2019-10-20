import React from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation, EditableInput } from 'react-color/lib/components/common';

const ColorPicker = ({ color, onChange, contentWidth, contentHeight, ...rest }) => {
  console.log(contentWidth, contentHeight)
  return (
    <div style={{height: contentHeight, width: contentWidth, margin: 0, border: "solid 1px white"}}>
      <div style={{position: "relative", height: (contentHeight - 60)}}>
        <Saturation
          color={color}
          {...rest}
          onChange={onChange}
        />
      </div>

      <div style={{position: "relative", height: 10, borderTop: "solid 2px white"}}>
        <Hue
          color={color}
          {...rest}
          onChange={onChange}
        />
      </div>

      <div style={{position: "relative", height: 40, borderTop: "solid 2px white" }}>
        {/* HEX INPUT */}
        <EditableInput
          label="hex"
          style={{
            label: {
              position: "absolute",
              top: 0,
              left: 0,
              fontSize: 13,
              fontWeight: "bold",
              padding: 6,
              paddingRight: 12,
              margin: 2,
              backgroundColor: "#f9f9f9",
            },
            input: {
              width: "100%",
              textAlign: "right"
            }
          }}
          value={color.hex}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default CustomPicker(ColorPicker);
