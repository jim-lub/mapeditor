export const modifyLayerSortOrderArray = ({
  sortOrder, layerId, action = null,
  sourceIndex = null, destinationIndex = null
}) => {
  const sortOrderClone = [...sortOrder];

  if (action === 'remove') {
    if (!layerId) return;

    const layerIndex = sortOrderClone.indexOf( layerId );
    sortOrderClone.splice(layerIndex, 1);
  }

  if (action === 'add') {
    if (!layerId) return;

    sortOrderClone.push( layerId );
  }

  if (action === 'move') {
    if (!sourceIndex || !destinationIndex) return;

    const [removedLayerId] = sortOrderClone.splice(sourceIndex, 1);
    sortOrderClone.splice(destinationIndex, 1, removedLayerId);
  }

  return sortOrderClone;
}
