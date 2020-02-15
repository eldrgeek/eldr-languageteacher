import { createHook } from 'overmind-react';
import { state } from './state';
import { onInitialize } from './onInitialize';
import * as actions from './actions';
import * as effects from './effects';
import { createOvermind } from 'overmind';
import { statemanager } from './statemanager';

// import { VALUE } from 'proxy-state-tree';
export let useApp;
export let app;
console.log('loading index');
const config = {
  onInitialize,
  state,
  actions,
  effects,
};
statemanager.computeScalarStates(state);
console.log('About to initialize');
const initialize = async () => {
  app = createOvermind(config, {
    // devtools: 'penguin.linux.test:8080', //
    devtools: 'localhost:3031',
  });
  // statemanager.saveAttrs(config);
  statemanager.makeReactions(app);
};
console.log('End of initialize', app);

// if (app.dispose) app.dispose();
useApp = createHook();

initialize();

// if (!module.hot) {
//   //   console.log("not hot")
//   //   initialize();
//   initialize();
// } else {
//   if (!module.hot.data) {
//     console.log('no hot data');
//     initialize();

//     module.hot.dispose(data => {
//       console.log('setting up dispoase');
//       data.app = app;
//       data.useApp = useApp;
//     });
//   } else {
//     console.log('restoring what was disposed');
//     app = module.hot.data.app;
//     useApp = module.hot.data.useApp;
//     // module.hot.accept(errorHandler);
//   }
// }
