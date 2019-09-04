import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Component = () => {

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
