console.log('loading actions');
// export const changeNewTodoTitle = ({ state }, title) => {
//   state.newTodoTitle = title;
// };

export const setErrorMessage = async ({ state, effects }, error) => {
  state.errorMessage = error;
  effects.translate.clearErrorMessage();
};

export const clearErrorMessage = ({ state, effects }, error) => {
  state.errorMessage = '';
};

export const setFragmentIndex = ({ state, effects, actions }, index) => {
  if (index < 0) {
    actions.setErrorMessage('Must be greater than zero');
    return;
  }
  if (state.fragments[index] && state.fragments[index].time != null) {
    state.fragmentIndex = index;
    actions.setMediaTime(state.fragments[index].time);
  } else {
    actions.setErrorMessage('Time not set');
  }
};
export const nextFragment = ({ state, actions }) => {
  if (state.fragmentIndex + 1 === state.fragments.length) {
    actions.setErrorMessage("Can't exceed fragments boundary");
  } else {
    state.fragmentIndex++;
  }
};

export const prevFragment = ({ state, actions }) => {
  if (state.fragmentIndex === 0) {
    actions.setErrorMessage("Can't go below zero");
  } else {
    state.fragmentIndex--;
  }
};
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
  let newIndex = actions.findMediaIndex(time);
  state.fragmentIndex = newIndex;
  state.mediaTime = time;
};

export const fragmentStamp = async ({ state, effects }, time) => {
  state.fragments[state.fragmentIndex + 1].time = time;
  let target = await effects.translate.toTarget(
    state.currrentFragment().source
  );
  state.currrentFragment().target = target;
  nextFragment();
};

export const translateFragment = async ({ state, effects }) => {
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

export const toggleUserPlay = ({ state }) => {
  state.userPlay = !state.userPlay;
  state.play = state.userPlay;
};

export const setPlay = ({ state }, play) => {
  if (play) {
    state.play = state.userPlay;
  } else {
    state.play = false;
  }
};

//export const nextly = ({ state }, time) => {};
