import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
// const electron = window.require('electron');
// const userDataPath = (electron.app || electron.remote.app).getPath("userData");
// console.log(userDataPath);
function logEvent(data) {
  const { localStorage } = window;
  // get previously stored log or a blank array.
  const storedLog = localStorage.getItem('grindLogs')
    ? JSON.parse(localStorage.getItem('grindLogs'))
    : [];

  // append new event data
  const updatedLog = storedLog.concat(data);

  // save updatedLog back to local storage
  localStorage.setItem('grindLogs', JSON.stringify(updatedLog));
  // const logFile = JSON.parse(localStorage.getItem("log"));
  // console.log(logFile);/
}

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
      logEvent({
        event: 'STOP',
        time: lastStop,
        tag: 'emoji',
        comment: 'msg'
      });
      console.log({ lastStop, lastSession });
      // stop timer
      this.stopTimerDisplay();
    } else {
      // record current time as start time
      lastStart = time;
      logEvent({
        event: 'START',
        time: lastStart,
        tag: '#category',
        comment: 'msg'
      });
      // this.setState({ lastStart: time });
      console.log({ lastStart });

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