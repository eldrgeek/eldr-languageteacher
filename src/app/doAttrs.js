const doAttrs = (state, gate, func) => {
  // console.log(state);
  const attributes =
    state.devState.stateAttributes || Object.keys(state).join(',');
  // console.log(attributes, state.devState[gate]);
  if (state.devState[gate]) attributes.split(',').forEach(func);
};
export default doAttrs;
