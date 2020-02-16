import text from '../data/chapter1';
console.log('loading onInitialize');

export const onInitialize = async ({ state, actions, effects }, instance) => {
  console.log('on initialize', state, actions, effects);
  effects.storage.initialize(state);
  effects.translate.initialize(actions.clearErrorMessage);

  effects.translate.convertChapter(state, actions, text);
  console.log('old', actions.translateFragment);
  actions.translateFragment();
  if (state.play) {
    actions.computeTimeout();
  }
};
