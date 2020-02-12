import { CurrentModule, React, useApp } from '../CurrentModule';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

const ErrorMessage = () => {
  const classes = useStyles();
  const { state } = useApp();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography variant="body1" gutterBottom>
          {state.errorMessage ? <div>{state.errorMessage}</div> : ''}
        </Typography>
      </div>
    </React.Fragment>
  );
};
export default ErrorMessage;
CurrentModule(ErrorMessage);
