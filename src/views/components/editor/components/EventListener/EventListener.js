import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Component = () => {
  // const [keyPressed, setKeyPressed] = useState(false);
  // const [targetKey, setTargetKey] = useState('shift');
  //
  // useEffect(() => {
  //   console.log(keyPressed)
  // }, [keyPressed]);
  //
  // const downHandler = ({ key }) => {
  //   if (key.toUpperCase() === targetKey.toUpperCase()) {
  //     setKeyPressed(true);
  //   }
  // }
  //
  // const upHandler = ({ key }) => {
  //   if (key.toUpperCase() === targetKey.toUpperCase()) {
  //     setKeyPressed(false);
  //   }
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('keydown', downHandler);
  //   window.addEventListener('keyup', upHandler);
  //   // Remove event listeners on cleanup
  //   return () => {
  //     window.removeEventListener('keydown', downHandler);
  //     window.removeEventListener('keyup', upHandler);
  //   };
  //   //eslint-disable-next-line
  // }, [keyPressed]);

  return null;
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
