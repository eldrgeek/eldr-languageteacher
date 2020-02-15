import text from '../data/chapter1';
import { statemanager } from './statemanager';
console.log('loading onInitialize');
export const onInitialize = ({ state, actions, effects }, instance) => {
  console.log('on initialize');
  effects.storage.initialize(state);
  effects.translate.initialize(actions.clearErrorMessage);
  statemanager.init({ state, actions, effects });
  console.log('initialized');
  effects.translate.convertChapter(state, actions, text);
  actions.translateFragment();
  if (state.play) {
    actions.computeTimeout();
  }
};
