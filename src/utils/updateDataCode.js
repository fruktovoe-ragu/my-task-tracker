const updateDataCodeArr = (entitiesArr, newItemId, newItemContent, updatedItemContent) => {
    const existingEntity = entitiesArr.find(item => item.id === newItemId);

    if (existingEntity) {
        return entitiesArr.map(item =>
            item.id === newItemId ? { ...item, ...updatedItemContent } : item
        );
    } else {
        return [...entitiesArr, newItemContent];
    }
  };

export default updateDataCodeArr;
