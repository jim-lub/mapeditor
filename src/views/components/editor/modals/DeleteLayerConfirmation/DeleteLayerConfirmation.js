import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteLayer } from 'state/ducks/editor/layers';

import { ModalComponents } from 'views/components/Modal';

import styles from './delete-layer-form.module.css';

const Component = ({ layerId, layerName, actions, onClose }) => {
  const handleSubmit = () => {
    actions.deleteLayer({ layerId });
    onClose();
  }

  return (
    <div>
      <div className={styles.warning}>
        Are you sure you want to delete the layer? This action <span className={styles.bold}>cannot</span> be undone.
      </div>

      <ModalComponents.DefaultFooter
        buttonLeft={
          () => (
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          )
        }

        buttonRight={
          () => (
            <button type="submit" className="red" onClick={handleSubmit}>
              Delete
            </button>
          )
        }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ deleteLayer }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
