console.log('loading state');
export const state = {
  title: 'The application title',
  devState: {
    stateAttributes: 'testValue,value1',
    restoreState: false,
    saveState: true,
    logDiags: {
      save: false,
      restore: true,
    },
  },

  testValue: 'testing value',
  value1: 'new value1',
  logValues: ['a', 'b'],
};
