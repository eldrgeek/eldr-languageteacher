import { CurrentModule, React, useApp } from '../CurrentModule';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});
export default function Types(english, polish) {
  const classes = useStyles();
  const { state, effects } = useApp();
  return (
    <div className={classes.root}>
      <Typography variant="body1" gutterBottom>
        {state.currentFragment.source.split(' ').map(word => (
          <span>{word} </span>
        ))}

        {state.currentFragment.target
          ? state.currentFragment.target
              .split(' ')
              .map(word => <span>{word}</span>)
          : ''}
      </Typography>
    </div>
  );
}

// CurrentModule(Types);
