import React from 'react';

// Style
import { withStyles } from '@material-ui/core/styles';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import VeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Dissatisfied from '@material-ui/icons/SentimentDissatisfiedOutlined';
import VerySatisfied from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import Satisfied from '@material-ui/icons/SentimentSatisfiedOutlined';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// button stuff
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { remote } from 'electron';
import localStore from '../utils/localStore';

const currentWindow = remote.getCurrentWindow();

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function StopDialog() {
  const { tag, gTime, goal } = localStore.get('session');
  const [values, setValues] = React.useState({
    mood: null,
    comment: null
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    currentWindow.close();
  };
  const handleSave = () => {
    localStore.update('session', values);
    localStore.saveToLog('session');
    localStore.remove('session');
    currentWindow.close();
  };

  const formatTime = ms => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return seconds < 60 ? `${seconds} seconds` : `${minutes} minutes`;
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        open={
          (console.log('Dialog Hidden'),
          setTimeout(() => {
            console.log('showing dialog');
            setOpen(true);
          }, 200),
          open)
        }
      >
        <DialogTitle onClose={handleClose}>How did it go?</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item align="left">{`#${tag}   (${formatTime(gTime)})`}</Grid>
            <Grid item>{`Goal: ${goal}`}</Grid>
            <Grid item>
              <ToggleButtonGroup
                value={values.mood}
                exclusive
                onChange={(event, newMood) =>
                  setValues({ ...values, mood: newMood })
                }
              >
                <ToggleButton value="VeryDissatisfied">
                  <VeryDissatisfied fontSize="large" />
                </ToggleButton>
                <ToggleButton value="Dissatisfied">
                  <Dissatisfied fontSize="large" />
                </ToggleButton>
                <ToggleButton value="Satisfied">
                  <Satisfied fontSize="large" />
                </ToggleButton>
                <ToggleButton value="VerySatisfied">
                  <VerySatisfied fontSize="large" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <TextField
                label="comment"
                variant="outlined"
                multiline
                rows="2"
                rowsMax="4"
                fullWidth
                onChange={handleChange('comment')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
