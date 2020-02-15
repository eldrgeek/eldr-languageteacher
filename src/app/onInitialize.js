import text from '../data/chapter1';
import { statemanager } from './statemanager';
console.log('loading onInitialize');
export const onInitialize = async ({ state, actions, effects }, instance) => {
  console.log('on initialize');
  // debugger
  statemanager.process({ state, actions, effects });
  effects.storage.initialize(state);
  effects.translate.initialize(actions.clearErrorMessage);

  effects.translate.convertChapter(state, actions, text);
  console.log('old', actions.translateFragment);
  actions.translateFragment();
  if (state.play) {
    actions.computeTimeout();
  }

  statemanager.saveAttrs(state, effects);
};

export const onInitialize1 = async ({ state, actions, effects }, instance) => {
  console.log('on initialize1');
  debugger;
  effects.storage.initialize(state);
  effects.translate.initialize(actions.clearErrorMessage);
  effects.translate.convertChapter(state, actions, text);
  actions.translateFragment();
  if (state.play) {
    actions.computeTimeout();
  }
};
