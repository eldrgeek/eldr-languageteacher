import { CurrentModule, React, useApp } from '../CurrentModule';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
// import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Controls() {
  const classes = useStyles();
  const { state, actions } = useApp();
  return (
    <div className={classes.root}>
      {/* <h1>this is hs</h1> */}
      <IconButton
        onClick={actions.prevFragment}
        color="primary"
        aria-label="replay"
      >
        <FastRewindIcon />
      </IconButton>
      {/* <IconButton color="primary" aria-label="replay">
        <NavigateBeforeIcon />
      </IconButton> */}
      <IconButton
        onClick={actions.toggleUserPlay}
        aria-label="delete"
        color="primary"
      >
        {!state.play ? <PlayArrowIcon /> : <PauseIcon />}
      </IconButton>
      {/* <IconButton color="primary" aria-label="replay">
        <NavigateNextIcon />
      </IconButton> */}
      <IconButton
        onClick={actions.nextFragment}
        aria-label="play"
        color="primary"
      >
        <FastForwardIcon />
      </IconButton>
      {Math.floor(state.mediaTime)}
    </div>
  );
}
CurrentModule(Controls);
