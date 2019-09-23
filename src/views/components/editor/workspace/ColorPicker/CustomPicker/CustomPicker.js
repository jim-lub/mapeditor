import React, { useEffect, useState } from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation, EditableInput } from 'react-color/lib/components/common';

const ColorPicker = (props) => {
  const { color, onChange, rgb } = props;

  // const handleChange = (inputValue) => {
  //   const [key, value] = Object.entries(inputValue)[0];
  //
  //   onChange({
  //     r: (key === 'r') ? Number(value) : rgb.r,
  //     g: (key === 'g') ? Number(value) : rgb.g,
  //     b: (key === 'b') ? Number(value) : rgb.b,
  //   })
  // }

  return (
    <div style={{margin: 0, border: "solid 1px white"}}>
      <div style={{position: "relative", height: 150}}>
        <Saturation
          {...props}
          onChange={onChange}
        />
      </div>

      <div style={{position: "relative", height: 15, borderTop: "solid 2px white"}}>
        <Hue
          {...props}
          onChange={onChange}
        />
      </div>

      <div style={{position: "relative", borderTop: "solid 2px white" }}>
        {/* HEX INPUT */}
        <EditableInput
          label="hex"
          style={{
            label: {
              position: "absolute",
              top: 0,
              left: 0
            },
            input: {
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

// {/* R INPUT */}
// <EditableInput
//   label="r"
//   style={{
//
//   }}
//   value={rgb.r}
//   onChange={handleChange}
// />
//
// {/* G INPUT */}
// <EditableInput
//   label="g"
//   style={{
//
//   }}
//   value={rgb.g}
//   onChange={handleChange}
// />
//
// {/* B INPUT */}
// <EditableInput
//   label="b"
//   style={{
//
//   }}
//   value={rgb.b}
//   onChange={handleChange}
// />
