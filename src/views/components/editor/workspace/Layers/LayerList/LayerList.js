import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Layer } from './Layer';

// import styles from '../layers.module.css';

export default ({ activeLayerId, layerSortOrder, allLayerProperties, onSortOrderChange, setActiveLayer }) => {
  const onDragEnd = ({ source, destination }) => {
    if (!destination || !destination.hasOwnProperty('index')) return;

    // layer list is displayed in reverse for a more "natural" feel of layer sort order
    // in order to keep the right order in the layerSortOrder after dragging we
    // need to find the indexes in the original array
    const sortOrder = [...layerSortOrder].reverse();
    const sourceIndex = layerSortOrder.indexOf( sortOrder[source.index] );
    const destinationIndex = layerSortOrder.indexOf( sortOrder[destination.index] );

    // console.log(sortOrder);
    // console.log(layerSortOrder);
    // console.log(sourceIndex, source.index);
    // console.log(destinationIndex, destination.index);

    onSortOrderChange({
      sourceIndex,
      destinationIndex
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                        layerType={allLayerProperties[layerId].type}
                        name={allLayerProperties[layerId].name}
                        isActive={(layerId === activeLayerId)}
                        isDragging={snapshot.isDragging}
                        onClick={setActiveLayer}
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
  )
}
