import { createOvermind as originalOvermind } from 'overmind';
import { onInitialize } from './onInitialize';
console.log('loading statemanager');
export const statemanager = (() => {
  let state, effects;
  let scalarStates;
  let attributes;
  let savedAttributes;
  const devState = {
    stateAttributes: null, //"title,fragments,fragmentIndex,mediaURL,mediaTime,userPlay,play,errorMessage,errorTimeout,nToConvert,nToPreserve",
    //'fragments,fragmentIndex,mediaTime,userPlay,play,nToPreserve,nToConvert',
    restoreState: true,
    saveState: true,
    logDiags: {
      save: true,
      restore: true,
    },
  };
  return {
    /*Get the names of the state variables that are not functions
    Must be called with state before createOvermind
    Sets stateAttributes to this list if it is null */
    getDevState() {
      return devState;
    },
    async saveLocalAttribute(attr, value) {
      if (devState.logSave) console.log('saving ', attr, value);
      localStorage.setItem(attr, JSON.stringify(value));
    },

    getLocalAttribute(attr, value) {
      let saved = localStorage.getItem(attr);
      if (devState.logRestore)
        console.log('recovered', attr, saved, JSON.parse(saved));
      try {
        return JSON.parse(saved);
      } catch (e) {
        return value;
      }
    },

    computeScalarStates(state) {
      if (state.devState.stateAttributes !== null) {
        scalarStates = state.devState.stateAttributes.split(',');
      } else {
        //automatically create the list to save
        scalarStates = Object.keys(state).filter(
          e => typeof state[e] !== 'function' && e !== 'devState'
        );
        // console.log(scalarStates);
      }
      state.devState.stateAttributes = scalarStates.join(',');
    },
    /* save the state and effects for use within this module
    Restore all the attributes that have been saved, and 
     */
    process(context) {
      console.log('process', context);
      state = context.state;
      effects = context.effects;
      console.log('getState', context.state, state.devState.stateAttributes);
      //stateAttributes must have been set by call to computeScalarStates
      attributes = state.devState.stateAttributes.split(',');
      savedAttributes = this.getLocalAttribute('savedAttributes');
      if (!savedAttributes) savedAttributes = [];
      if (!state.devState.restoreState) return;
      savedAttributes.forEach(
        attr => (state[attr] = this.getLocalAttribute(attr))
      ); // await actions.restoreSavedAttrs();
      // this.restoreSavedAttrs();
    },

    async saveAttrs() {
      if (state.devState.saveState) {
        attributes.forEach(attr =>
          effects.storage.saveLocalAttribute(attr, state[attr])
        );
        savedAttributes = attributes;
      } else {
        savedAttributes = [];
      }
      effects.storage.saveLocalAttribute('savedAttributes', savedAttributes);
    },
    restoreSavedAttrs(state) {
      if (!state.devState.restoreState) return;
      savedAttributes.forEach(
        attr => (state[attr] = effects.storage.getLocalAttribute(attr))
      );
    },

    makeReactions(app) {
      if (attributes) attributes.forEach(attr => this.makeReaction(app, attr));
    },
    makeReaction(app, attr) {
      app.reaction(
        state => state[attr],
        //Fix bug passing fragments
        value => {
          // console.log('saved ' + attr, value);
          effects.storage.saveLocalAttribute(attr, value);
        }
      );
    },
  };
})();

let oldInitialize;

const onInitializeProxy = ({ state, actions, effects }, instance) => {
  // debugger
  //  statemanager.process(state, actions, effects);
  console.log('proxy', state);
  // statemanager.restoreSavedAttrs(state)
  oldInitialize({ state, actions, effects }, instance);
  // console.log("init complete")
  // statemanager.saveAttrs();
};

export const createOvermind = (config, options) => {
  // debugger
  config.state.devState = statemanager.getDevState();
  statemanager.computeScalarStates(config.state);
  oldInitialize = config.onInitialize;
  config.onInitialize = onInitializeProxy;

  // console.log(config.state);
  let app = originalOvermind(config, options);
  // statemanager.saveAttrs(config);
  statemanager.makeReactions(app);
  return app;
};
