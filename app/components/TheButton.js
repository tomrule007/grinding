import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import log from './log';

class TheButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastStart: null,
      lastStop: null,
      lastSession: 0,
      grinding: false,
      color: 'primary',
      intervalHandle: null,
      timeDisplay: 'start'
    };
  }

  startTimerDisplay() {
    const boundTimer = this.timerDisplayTick.bind(this);
    const intervalHandle = setInterval(boundTimer, 1000);

    this.setState({ intervalHandle, timeDisplay: '0' });
  }

  timerDisplayTick() {
    const { lastStart } = this.state;
    const seconds = Math.floor((Date.now() - lastStart) / 1000);
    const minutes = Math.floor(seconds / 60);

    this.setState({ timeDisplay: seconds < 60 ? seconds : minutes });
  }

  stopTimerDisplay() {
    const { intervalHandle } = this.state;
    clearInterval(intervalHandle);
  }

  toggleStateAndSave(time) {
    let { grinding, lastStop, lastStart, lastSession } = this.state;

    if (grinding) {
      // record current time as stop time
      lastStop = time;
      lastSession = lastStop - lastStart;
      log.stop({
        stop: lastStop,
        mood: 'mood placeholder',
        comment: 'comment placeholder',
        gTime: lastSession
      });
      console.log({ lastStop, lastSession });
      // stop timer
      this.stopTimerDisplay();
    } else {
      // record current time as start time
      lastStart = time;
      log.start({
        start: lastStart,
        tag: 'tag placeholder',
        goal: 'goal placeholder'
      });
      // start timer
      this.startTimerDisplay();
    }
    // toggle state
    grinding = !grinding;

    // toggle color
    const color = grinding ? 'secondary' : 'primary';
    this.setState({ grinding, lastStart, lastStop, lastSession, color });
  }

  render() {
    const { color, timeDisplay } = this.state;
    return (
      <Fab color={color} onClick={() => this.toggleStateAndSave(Date.now())}>
        {timeDisplay}
      </Fab>
    );
  }
}

export default TheButton;
