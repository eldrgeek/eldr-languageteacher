console.log('loading state');
export const state = {
  title: 'The application title',
  devState: {
    stateAttributes: 'fragments,fragmentIndex',
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
      time: 1,
      source:
        'Byli ostatnimi ludźmi, których można by posądzić o udział w czymś dziwnym lub tajemniczym, bo po prostu nie wierzyli w takie bzdury.',
    },
    {
      time: 1.5,
      source: 'Pan Dursley był dyrektorem firmy Grunnings produkującej świdry.',
    },
  ],
  fragmentIndex: 0,
  mediaURL: 'https://soundcloud.com/mike-wolf-443507667/harry-potter-part-1',
  mediaTime: 0,
  userPlay: true,
  play: true,
  errorMessage: '',
  errorTimeout: 3000,
  currentFragment: ({ fragmentIndex, fragments }) => fragments[fragmentIndex],
  nextFragmentTime: ({ fragmentIndex, fragments }) => {
    const fragment = fragments[fragmentIndex + 1];
    if (!fragment) return null;
    return fragment.time;
  },
};
