import fragments from '../data/fragments';
console.log('loading state');

export const state = {
  title: 'The application title',
  fragments: [],
  fragmentIndex: 0,
  mediaURL: 'https://youtu.be/mq3I8qb1MM4', //'https://soundcloud.com/mike-wolf-443507667/harry-potter-part-1',
  mediaTime: 0,
  userPlay: false,
  play: false,
  errorMessage: '',
  errorTimeout: 2000,
  nToConvert: 3,
  nToPreserve: 6,
  currentFragment: ({ fragmentIndex, fragments }) => fragments[fragmentIndex],
  nextFragmentTime: ({ fragmentIndex, fragments }) => {
    const fragment = fragments[fragmentIndex + 1];
    if (!fragment) return null;
    return fragment.time;
  },
  devState: {
    stateAttributes: null, //"title,fragments,fragmentIndex,mediaURL,mediaTime,userPlay,play,errorMessage,errorTimeout,nToConvert,nToPreserve",
    //'fragments,fragmentIndex,mediaTime,userPlay,play,nToPreserve,nToConvert',
    restoreState: true,
    saveState: true,
    logDiags: {
      save: true,
      restore: true,
    },
  },
};
state.fragments = fragments;
//https://youtu.be/mq3I8qb1MM4////
