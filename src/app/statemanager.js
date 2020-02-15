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
          e => typeof state[e] !== 'function' && e !== 'devState'
        );
        // console.log(scalarStates);
      }
      state.devState.stateAttributes = scalarStates.join(',');
    },
    /* save the state and effects for use within this module
    Restore all the attributes that have been saved, and 
     */
    async process(context) {
      state = context.state;
      effects = context.effects;
      //stateAttributes must have been set by call to computeScalarStates
      attributes = state.devState.stateAttributes.split(',');
      savedAttributes = await effects.storage.getLocalAttribute(
        'savedAttributes'
      );
      if (!savedAttributes) savedAttributes = [];
      // await actions.restoreSavedAttrs();
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
    restoreSavedAttrs() {
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