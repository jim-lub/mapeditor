import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as firestore from 'state/lib/utils/_dev/firestore/project-scene-utils';

const Component = ({ actions }) => {
  return (
    <div style={{ margin: 50 }}>
      <button className="blue" onClick={() => actions.fillProjects(5)}>Add 5 projects</button><br /><br />
      <button className="blue" onClick={() => actions.fillProjects(10)}>Add 10 projects</button><br /><br />
      <button className="blue" onClick={() => actions.fillProjects(15)}>Add 15 projects</button><br /><br />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fillProjects: (a) => firestore.firestore_fillProjects(a)
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
