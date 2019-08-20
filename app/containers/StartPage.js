import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

export default function CustomizedDialogs() {
  const [values, setValues] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    // cancel currentSession
    // remove temp log
    localStore.remove('session');

    // close window
    currentWindow.close();
  };
  const handleSave = () => {
    localStore.update('session', values);
    currentWindow.close();
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="customized-dialog-title"
        open={
          (console.log('Dialog Hidden'),
          setTimeout(() => {
            console.log('showing dialog');
            setOpen(true);
          }, 50),
          open)
        }
      >
        <DialogTitle id="start-prompt-title" onClose={handleClose}>
          Grinding Time!
        </DialogTitle>
        <DialogContent dividers>
          <List>
            <ListItem>
              <TextField
                id="tag-input"
                label="Tag"
                variant="outlined"
                autoFocus
                fullWidth
                required
                onChange={handleChange('tag')}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="goal-input"
                label="goal"
                variant="outlined"
                multiline
                rows="2"
                rowsMax="4"
                fullWidth
                onChange={handleChange('goal')}
              />
            </ListItem>
          </List>
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
