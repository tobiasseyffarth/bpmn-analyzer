export function getElementOfRegistry(viewer, id) {
  const elementRegistry = viewer.get('elementRegistry');
  const element = elementRegistry.get(id);

  return element.businessObject;
}

export function getPredecessor(businessObject) {
  const result = [];

  if (businessObject.incoming !== undefined) {
    const { incoming } = businessObject;

    for (let i = 0; i < incoming.length; i++) {
      result.push(incoming[i].sourceRef);
    }
    return result;
  }
  return null;
}

export function getSuccessor(businessObject) {
  const result = [];

  if (businessObject.outgoing !== undefined) {
    const { outgoing } = businessObject;

    for (let i = 0; i < outgoing.length; i++) {
      result.push(outgoing[i].targetRef);
    }
    return result; // array of flownodes
  }
  return null;
}

export function getDataInput(businessObject, viewer) {
  const result = [];

  if (businessObject.dataInputAssociations !== undefined){
    for (let i = 0; i < businessObject.dataInputAssociations.length; i++){
      const input = businessObject.dataInputAssociations[i];
      const sourceId = input.sourceRef[0].id;
      const inputShape = getElementOfRegistry(viewer, sourceId);
      result.push(inputShape);
    }
  }

  return result;
}

export function getDataOutput(businessObject, viewer) {
  const result = [];

  if (businessObject.dataOutputAssociations !== undefined){
    for (let i = 0; i < businessObject.dataOutputAssociations.length; i++){
      const output = businessObject.dataOutputAssociations[i];
      // console.log(output);
      const targetId = output.targetRef.id;
      const outputShape = getElementOfRegistry(viewer, targetId);
      result.push(outputShape);
    }
  }
  return result;
}