import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  moveLayer,
  getLayerSortOrder,
  getActiveLayerId
} from 'state/ducks/editor/layers';

import { Layer } from './Layer';

const Component = ({ layerSortOrder, activeLayerId, openDeleteLayerModal, actions }) => {
  const handleDragEnd = ({ source, destination }) => {
    if (!destination || !destination.hasOwnProperty('index')) return;

    // layer list is displayed in reverse for a more "natural" feel of layer sort order
    // in order to keep the right order in the layerSortOrder after dragging we
    // need to find the indexes in the original array
    const sortOrder = [...layerSortOrder].reverse();
    const sourceIndex = layerSortOrder.indexOf( sortOrder[source.index] );
    const destinationIndex = layerSortOrder.indexOf( sortOrder[destination.index] );

    actions.moveLayer({ sourceIndex, destinationIndex });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {[...layerSortOrder].reverse().map((layerId, index) => (
              <Draggable key={layerId} draggableId={layerId} index={index}>
                {(provided, snapshot) => (
                  <PortalItem
                    layerId={layerId}
                    isActive={layerId === activeLayerId}
                    openDeleteLayerModal={openDeleteLayerModal}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const PortalItem = ({
  layerId, isActive, openDeleteLayerModal,
  provided, snapshot
}) => {
  const usePortal = snapshot.isDragging;

  const child = (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Layer
        layerId={layerId}
        isActive={isActive}
        isDragging={snapshot.isDragging}
        openDeleteLayerModal={openDeleteLayerModal}
      />
    </div>
  )

  if (!usePortal) {
    return child;
  }

  return ReactDOM.createPortal(child, document.getElementById('drag-n-drop-root'))
}

const mapStateToProps = (state) => {
  return {
    layerSortOrder: getLayerSortOrder(state),
    activeLayerId: getActiveLayerId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ moveLayer }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
