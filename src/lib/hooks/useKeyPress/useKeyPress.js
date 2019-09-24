import { useState, useEffect } from 'react';

export const useKeyPress = (targetKey) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = ({ key }) => {
    if (key.toUpperCase() === targetKey.toUpperCase()) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key.toUpperCase() === targetKey.toUpperCase()) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
    //eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
