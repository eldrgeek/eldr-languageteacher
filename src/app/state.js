console.log('loading state');
export const state = {
  title: 'The application title',
  devState: {
    stateAttributes:
      'fragments,fragmentIndex,mediaTime,userPlay,pause,nToPreserve,nToConvert',
    restoreState: true,
    saveState: true,
    logDiags: {
      save: true,
      restore: true,
    },
  },

  fragments: [
    {
      time: 0,
      source:
        'Państwo Dursleyowie spod numeru czwartego przy Privet Drive mogli z dumą twierdzić, że są całkowicie normalni, chwała Bogu.',
    },
    {
      time: 0.175,
      target: null,
      source:
        'Byli ostatnimi ludźmi, których można by posądzić o udział w czymś dziwnym lub tajemniczym, bo po prostu nie wierzyli w takie bzdury.',
    },
    {
      time: 2.5,
      target: null,
      source: 'Pan Dursley był dyrektorem firmy Grunnings produkującej świdry.',
    },
    {
      time: null,
      target: null,
      source: 'Pan Dursley był dyrektorem firmy Grunnings produkującej świdry.',
    },
  ],
  fragmentIndex: 0,
  mediaURL: 'https://soundcloud.com/mike-wolf-443507667/harry-potter-part-1',
  mediaTime: 0,
  userPlay: true,
  pause: true,
  errorMessage: '',
  errorTimeout: 2000,
  nToConvert: 3,
  nToPreserve: 3,
  currentFragment: ({ fragmentIndex, fragments }) => fragments[fragmentIndex],
  nextFragmentTime: ({ fragmentIndex, fragments }) => {
    const fragment = fragments[fragmentIndex + 1];
    if (!fragment) return null;
    return fragment.time;
  },
};
