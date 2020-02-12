console.log('loading state');
export const state = {
  title: 'The application title',
  devState: {
    stateAttributes:
      'fragments,fragmentIndex,mediaTime,userPlay,play,nToPreserve,nToConvert',
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
      target: null,
      source: 'Harry Potter i kamień Filozoficzny',
    },
    {
      time: 14,
      target: null,
      source: 'ROZDZIAŁ PIERWSZY',
    },
    {
      time: 16,
      target: null,
      source: 'Chłopiec, który przeżył',
    },
    {
      time: 21,
      target: null,
      source:
        'Państwo Dursleyowie spod numeru czwartego przy Privet Drive mogli z dumą twierdzić, że są całkowicie normalni, chwała Bogu.',
    },
    {
      time: 33,
      target: null,
      source:
        'Byli ostatnimi ludźmi, których można by posądzić o udział w czymś dziwnym lub tajemniczym, bo po prostu nie wierzyli w takie bzdury.',
    },
    {
      time: 46,
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
  mediaURL: 'https://youtu.be/mq3I8qb1MM4', //'https://soundcloud.com/mike-wolf-443507667/harry-potter-part-1',
  mediaTime: 0,
  userPlay: true,
  play: true,
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
//https://youtu.be/mq3I8qb1MM4////
