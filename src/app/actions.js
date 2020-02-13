console.log('loading actions');
// export const changeNewTodoTitle = ({ state }, title) => {
//   state.newTodoTitle = title;
// };

/* Set and clear an error message 
   Sets an error message, that clears after
   a time interval set in state.errorTimeout

*/
export const setErrorMessage = async ({ state, effects }, error) => {
  state.errorMessage = error;
  effects.translate.clearErrorMessage();
};

export const clearErrorMessage = ({ state, effects }, error) => {
  state.errorMessage = '';
};

/* Checks to see that the fragment index being set is OK
and if not, gives an error. If valid and the fragment has a 
valid media time, then it sets the 
media time to the time of that fragment. */
export const setFragmentIndex = ({ state, effects, actions }, index) => {
  if (index < 0) {
    actions.setErrorMessage('Must be greater than zero');
    return;
  }
  if (state.fragments[index] && state.fragments[index].time != null) {
    state.fragmentIndex = index;
    actions.setMediaTime(state.fragments[index].time);
    actions.translateFragment();
  } else {
    actions.setErrorMessage('Time not set');
  }
};
export const nextFragment = ({ state, actions }) => {
  actions.setFragmentIndex(state.fragmentIndex + 1);
  actions.seekToMediaTime();
};

export const prevFragment = ({ state, actions }) => {
  actions.setFragmentIndex(state.fragmentIndex - 1);
  actions.seekToMediaTime();
};

/* find the media index for a time such that the index
has the last time prior to the time */
export const findMediaIndex = ({ state }, time) => {
  if (state.fragments[state.fragmentIndex] === time) {
    return state.fragmentIndex;
  }
  for (let i = 1; i < state.fragments.length; i++) {
    if (state.fragments[i].time === null) {
      return i - 1;
    }
    if (state.fragments[i].time > time) {
      return i - 1;
    }
  }
  return state.fragments.length - 1;
};

export const setMediaTime = ({ state, actions }, time) => {
  time = Math.floor(time);
  let newIndex = actions.findMediaIndex(time);
  state.fragmentIndex = newIndex;
  state.mediaTime = time;
};

export const fragmentStampTime = ({ actions, effects }) => {
  actions.fragmentStamp(effects.translate.getMediaTime());
};

export const fragmentStamp = async ({ state, actions, effects }, time) => {
  state.fragments[state.fragmentIndex + 1].time = time;
  actions.nextFragment();
  actions.translateFragment();
};

export const translateFragment = async ({ state, effects }) => {
  if (!state.currentFragment.target)
    state.currentFragment.target = await effects.translate.toTarget(
      state.currentFragment.source
    );
};

export const appendFragment = ({ state }, fragment) => {
  let newFragment = {
    source: fragment,
    target: null,
    time: null,
  };
  if (state.fragments.length >= 20) return;
  state.fragments.push(newFragment);
  // console.log();
  //  state.fragments = state.fragments.splice(0,0,newFragment);
  // console.log('fragments', state.fragments);
};

export const toggleUserPlay = ({ state, actions }) => {
  state.userPlay = !state.userPlay;
  actions.setPlay(state.userPlay);
};

export const setPlay = ({ state, actions, effects }, play) => {
  if (play) {
    state.play = state.userPlay;
    if (state.play) {
      actions.computeTimeout();
    }
  } else {
    state.play = false;
    effects.translate.clearMediaTimeout();
  }
};

export const timeoutTriggered = ({ state, effects, actions }) => {
  const timeNow = effects.translate.getMediaTime();
  const nextTime = state.nextFragmentTime;
  if (nextTime - timeNow < 0.5) {
    state.fragmentIndex++;
    actions.setMediaTime(nextTime);
  } else {
    actions.setMediaTime(timeNow);
  }
  actions.computeTimeout();
};
export const computeTimeout = ({ state, effects, actions }) => {
  const timeNow = effects.translate.getMediaTime();
  const nextTime = state.nextFragmentTime;
  let delta = nextTime - timeNow;
  if (nextTime === null) return;
  if (!state.play) return;
  if (delta > 1) delta = 1;
  effects.translate.setMediaTimeout(actions.timeoutTriggered, delta * 1000);
};

export const checkTransport = ({ state }, time) => {};
export const seekToMediaTime = ({ state, effects }, time) => {
  effects.translate.getMediaRef().seekTo(state.mediaTime, 'seconds');
};
//export const nextly = ({ state }, time) => {};
