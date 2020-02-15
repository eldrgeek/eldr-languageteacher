import fragments from '../data/fragments';
console.log('loading statemanager');

export const statemanager = (() => {
  let state, effects;
  let scalarStates;
  let attributes;
  let savedAttributes;
  return {
    /*Get the names of the state variables that are not functions
    Must be called with state before createOvermind
    Sets stateAttributes to this list if it is null */
    computeScalarStates(state) {
      if (state.devState.stateAttributes !== null) {
        scalarStates = state.devState.stateAttributes.split(',');
      } else {
        //automatically create the list to save
        scalarStates = Object.keys(state).filter(
          key => typeof (state[key] !== 'function') && key !== 'devState'
        );
        state.devState.stateAttributes = scalarStates.join(',');
      }
    },
    /*
     */
    init(context) {
      state = context.state;
      effects = context.effects;
      //stateAttributes must have been set by call to computeScalarStates
      attributes = state.devState.stateAttributes.split(',');
      savedAttributes = effects.storage.getLocalAttribute('savedAttributes');
      if (!savedAttributes) savedAttributes = [];
      this.restoreAttrs();

      // this.saveAttrs();
      // savedAttributes = attributes;
      // effects.storage.saveLocalAttribute('savedAttributes', savedAttributes);
    },

    saveAttrs() {
      if (!state.devState.saveState) return;
      attributes.forEach(attr =>
        effects.storage.saveLocalAttribute(attr, state[attr])
      );
      savedAttributes = attributes;
      effects.storage.saveLocalAttribute('savedAttributes', savedAttributes);
    },
    restoreAttrs() {
      state.fragments = fragments;
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
