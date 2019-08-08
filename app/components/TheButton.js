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
      color: 'primary'
    };
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
    }
    // toggle state
    grinding = !grinding;

    // toggle color
    const color = grinding ? 'secondary' : 'primary';
    this.setState({ grinding, lastStart, lastStop, lastSession, color });
  }

  render() {
    const { color } = this.state;
    return (
      <Fab color={color} onClick={() => this.toggleStateAndSave(Date.now())}>
        4m
      </Fab>
    );
  }
}

export default TheButton;
