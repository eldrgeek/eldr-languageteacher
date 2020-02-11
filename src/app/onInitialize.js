import doAttrs from './doAttrs';
console.log('on initialize');
export const onInitialize = ({ state, actions, effects }, instance) => {
  effects.storage.initialize(state);
  effects.translate.initialize(actions.clearErrorMessage);
  const initializeAttr = attr => {
    state[attr] = effects.storage.getLocalAttribute(attr);
  };
  doAttrs(state, 'restoreState', initializeAttr);
};
