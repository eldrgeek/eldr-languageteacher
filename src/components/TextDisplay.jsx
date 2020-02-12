import { CurrentModule, React, useApp } from '../CurrentModule';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});
const mapWords = attribute => {
  return state.currentFragment.source
    .split(' ')
    .map(word => <span>{word} </span>);
};
export default function Types(english, polish) {
  const classes = useStyles();
  const { state, actions } = useApp();
  const MapWords = attributes => {
    const attribute = 'source';
    const initial = attribute[0];
    const words = state.currentFragment[attribute];
    return words
      ? words.split(' ').map((word, i) => (
          <span onClick={actions.fragmentStamp} key={initial + i}>
            {word}{' '}
          </span>
        ))
      : '';
  };
  return (
    <div className={classes.root}>
      <Typography variant="body1" gutterBottom>
        <MapWords attr="source" />
      </Typography>
    </div>
  );
}

// CurrentModule(Types);
