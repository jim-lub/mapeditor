import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  updateLayerSortOrder,
  getLayerSortOrder,
  getActiveLayerId
} from 'state/ducks/editor/map';

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

    actions.updateLayerSortOrder({ sourceIndex, destinationIndex });
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
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Layer
                      layerId={layerId}
                      isActive={(layerId === activeLayerId)}
                      isDragging={snapshot.isDragging}
                      openDeleteLayerModal={openDeleteLayerModal}
                    />
                  </div>
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

const mapStateToProps = (state) => {
  return {
    layerSortOrder: getLayerSortOrder(state),
    activeLayerId: getActiveLayerId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateLayerSortOrder }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
