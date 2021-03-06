import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

// style imports
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';

// utils
import localStore from '../utils/localStore';
import { startWin, stopWin } from '../utils/WindowFactory';
import { ON_COLOR, OFF_COLOR } from '../constants/defaultConfig';

const theme = createMuiTheme({
  palette: {
    primary: red, // offState
    secondary: lightGreen // onState
  }
});
class TheButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      grinding: false,
      intervalID: null,
      timeDisplay: 'start'
    };
  }

  componentDidMount() {
    // add localStorage listener
    window.addEventListener('storage', this.syncWithLocalStorage);
  }

  componentWillUnmount() {
    console.log('wrapper Unmounting');
    window.removeEventListener('storage', this.syncWithLocalStorage);
  }

  syncWithLocalStorage = ({ key, newValue }) => {
    // is session over?
    if (key === 'session') {
      console.log({ newValue });
    }
    if (key === 'session' && newValue === null) {
      // session is over reset display.
      console.log('canceling session');
      this.stopTimer();
      this.setState({ grinding: false, start: null });
    }
  };

  startTimer() {
    const intervalID = setInterval(() => this.timerTick(Date.now()), 1000);

    this.setState({ intervalID, timeDisplay: '0' });
  }

  timerTick(currentTime) {
    const { start } = this.state;
    const seconds = Math.floor((currentTime - start) / 1000);
    const minutes = Math.floor(seconds / 60);

    this.setState({ timeDisplay: seconds < 60 ? seconds : minutes });
  }

  stopTimer() {
    const { intervalID } = this.state;
    clearInterval(intervalID);
    this.setState({ timeDisplay: 'start' });
  }

  toggleGrind(clickTime) {
    let { grinding, start, stopWindow, startWindow } = this.state;

    // browserWindow -> browserWindow | false;
    const aliveAndVisible = browserWindow =>
      browserWindow && !browserWindow.isDestroyed() && browserWindow.isVisible()
        ? browserWindow
        : false;
    const visibleDialogWindow =
      aliveAndVisible(startWindow) || aliveAndVisible(stopWindow);
    if (visibleDialogWindow) {
      // if dialog is open stop state change and shake window for user attention
      console.log('click stopped! Shaking started :)');
      console.log(visibleDialogWindow);
      return;
    }

    // toggle state
    grinding = !grinding;

    if (grinding) {
      // starting grinding session
      start = clickTime;
      localStore.set('session', { start: clickTime });
      this.startTimer();
      startWindow = startWin.create();
    } else {
      // stopping grinding session
      localStore.update('session', {
        stop: clickTime,
        gTime: clickTime - start
      });
      this.stopTimer();
      stopWindow = stopWin.create();
    }

    this.setState({ grinding, start, stopWindow, startWindow });
  }

  render() {
    const { grinding, timeDisplay } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Fab
          color={grinding ? ON_COLOR : OFF_COLOR}
          onClick={() => this.toggleGrind(Date.now())}
        >
          {timeDisplay}
        </Fab>
      </ThemeProvider>
    );
  }
}

export default TheButton;
