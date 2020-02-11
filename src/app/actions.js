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
  }
  if ([state.fragments[index] && state.fragments[index].time]) {
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
export const findMediaIndex = ({ state }, time) => {
  if (state.fragments[state.fragmentIndex] === time) {
    return state.fragmentIndex;
  }
  for (let i = 1; i < state.fragments.length; i++) {
    if (state.fragments[i].time === null) {
      return i - 1;
    }
    if (state.fragments[i].time > setMediaTime) {
      return i - 1;
    }
  }
  return state.fragments.length - 1;
};

export const setMediaTime = ({ state }, time) => {
  let newIndex = findMediaIndex(time);
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
  state.currentFragment().target = await effects.translate.toTarget(
    state.currentFragment().source
  );
};

export const nex = ({ state }, time) => {};
