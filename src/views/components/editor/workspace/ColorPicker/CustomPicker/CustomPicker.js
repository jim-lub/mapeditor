import React, { useEffect, useState } from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation, EditableInput } from 'react-color/lib/components/common';

const ColorPicker = (props) => {
  const { onValueChange, onChange, hex, rgb, hsl } = props;

  useEffect(() => {
    onValueChange({
      hex,
      rgb,
      hsl
    })
  }, [hex, rgb, hsl, onValueChange]);

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

      <div style={{position: "relative", borderTop: "solid 2px white"}}>
        <EditableInput
          label="hex"
          style={{
            label: {
              visibility: "hidden",
              fontSize: 0
            },
            input: {
              width: "100%"
            }
          }}
          value={hex}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default CustomPicker(ColorPicker);
