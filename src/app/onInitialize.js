import doAttrs from './doAttrs';
console.log('on initialize');
export const onInitialize = ({ state, actions, effects }, instance) => {
  effects.storage.initialize(state);
  const initializeAttr = attr => {
    state[attr] = effects.storage.getLocalAttribute(attr);
  };
  doAttrs(state, 'restoreState', initializeAttr);
};
