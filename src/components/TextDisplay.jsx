import { CurrentModule, React, useApp } from '../CurrentModule';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});
const touchEvent = event => {
  console.log('touch event', event.target.getAttribute('id'));
};
const clickEvent = event => {
  console.log('click event', event.target.getAttribute('id'));
};

export default function TextDisplay(english, polish) {
  const classes = useStyles();
  const { state, actions } = useApp();
  React.useEffect(() => {
    const handleSpace = event => {
      console.log(event.keyCode);
      if (event.keyCode === 32) {
        actions.setErrorMessage('stamp time');
        actions.fragmentStampTime();
      }
    };

    window.addEventListener('keydown', handleSpace);

    return () => {
      window.removeEventListener('keydown', handleSpace);
    };
  }, [actions]);
  const MapWords = props => {
    const attribute = props.attr;
    const initialLetter = attribute[0];
    const words = state.currentFragment[attribute];
    // console.log('words', words);
    return words
      ? words.split(' ').map((word, i) => (
          <span
            key={initialLetter + i}
            id={initialLetter + i}
            onClick={clickEvent}
            onTouchStart={touchEvent}
          >
            {word}{' '}
          </span>
        ))
      : null;
  };
  return (
    <div className={classes.root}>
      <Typography variant="body1" gutterBottom>
        <MapWords attr="target" />
      </Typography>
      <hr />
      <Typography variant="body1" gutterBottom>
        <MapWords attr="source" />
      </Typography>
    </div>
  );
}

CurrentModule(TextDisplay);
