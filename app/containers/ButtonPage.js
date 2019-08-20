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
      color: OFF_COLOR,
      intervalID: null,
      timeDisplay: 'start'
    };
  }

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
    let { grinding, start, color } = this.state;

    // toggle state
    grinding = !grinding;

    if (grinding) {
      // starting grinding session
      color = ON_COLOR;
      start = clickTime;
      localStore.set('session', { start: clickTime });
      this.startTimer();
      startWin.create();
    } else {
      // stopping grinding session
      color = OFF_COLOR;
      localStore.update('session', {
        stop: clickTime,
        gTime: clickTime - start
      });
      this.stopTimer();
      stopWin.create();
    }

    this.setState({ grinding, start, color });
  }

  render() {
    const { color, timeDisplay } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Fab color={color} onClick={() => this.toggleGrind(Date.now())}>
          {timeDisplay}
        </Fab>
      </ThemeProvider>
    );
  }
}

export default TheButton;
