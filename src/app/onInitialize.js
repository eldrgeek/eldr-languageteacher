import text from '../data/chapter1';
import { statemanager } from './statemanager';
console.log('loading onInitialize');
export const onInitialize = async ({ state, actions, effects }, instance) => {
  console.log('on initialize');
  effects.storage.initialize(state);
  effects.translate.initialize(actions.clearErrorMessage);
  statemanager.process({ state, actions, effects });
  effects.translate.convertChapter(state, actions, text);
  actions.translateFragment();
  if (state.play) {
    actions.computeTimeout();
  }
  statemanager.saveAttrs();
  // statemanager.saveAttrs(state, effects);
};
