import React from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation, EditableInput } from 'react-color/lib/components/common';

import styles from './custompicker.module.css';

const Component = ({ color, contentWidth, contentHeight, onChange, ...rest }) => {
  const handleChange = (colorValue) => {
    const [key, value] = Object.entries(colorValue)[0];
    console.log(key, value)
    if (key === 'hex') {
      return onChange({ [key]: value })
    }

    if (key === 'r' || key === 'g' || key === 'b') {
      return onChange({
        r: (key === 'r') ? Number(value) : color.rgb.r,
        g: (key === 'g') ? Number(value) : color.rgb.g,
        b: (key === 'b') ? Number(value) : color.rgb.b,
      })
    }
  }

  return (
    <div className={styles.wrapper} style={{ width: contentWidth, height: contentHeight }}>
      <div className={styles.grid}>
        <div className={styles.saturationWrapper}>
          <Saturation
            color={color}
            {...rest}
            onChange={onChange}
          />
        </div>

        <div className={styles.hueWrapper}>
          <Hue
            color={color}
            {...rest}
            onChange={onChange}
            pointer={HuePointer}
            direction="vertical"
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.hexWrapper}>
            <EditableInput
              label="hex"
              style={{
                label: {
                  fontWeight: "bold"
                },
                input: {
                  width: "100%",
                  height: "auto",
                  padding: 1,
                  textAlign: "center",
                  fontSize: 10
                }
              }}
              value={color.hex}
              onChange={handleChange}
            />
          </div>
          <div className={styles.rWrapper}>
            <EditableInput
              label="r"
              style={{
                label: {
                  fontWeight: "bold",
                },
                input: {
                  width: "100%",
                  height: "auto",
                  padding: 1,
                  textAlign: "center",
                  fontSize: 10
                }
              }}
              value={(color.rgb.hasOwnProperty('r')) ? color.rgb.r : null}
              onChange={handleChange}
            />
          </div>
          <div className={styles.gWrapper}>
            <EditableInput
              label="g"
              style={{
                label: {
                  fontWeight: "bold",
                },
                input: {
                  width: "100%",
                  height: "auto",
                  padding: 1,
                  textAlign: "center",
                  fontSize: 10
                }
              }}
              value={(color.rgb.hasOwnProperty('g')) ? color.rgb.g : null}
              onChange={handleChange}
            />
          </div>
          <div className={styles.bWrapper}>
            <EditableInput
              label="b"
              style={{
                label: {
                  fontWeight: "bold",
                },
                input: {
                  width: "100%",
                  height: "auto",
                  padding: 1,
                  textAlign: "center",
                  fontSize: 10
                }
              }}
              value={(color.rgb.hasOwnProperty('b')) ? color.rgb.b : null}
              onChange={handleChange}
            />
          </div>


        </div>
      </div>
    </div>
  );
}

export default CustomPicker(Component);

const HuePointer = () => {
  return (
    <div style={{
      width: 10,
      height: 10,
      backgroundColor: "white",
      borderRadius: 5,
      border: "solid 1px black",
      transform: 'translate(1px, -5px)',
      cursor: 'pointer',
      boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)"
    }}/>
  )
}
