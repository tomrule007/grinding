import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";

function logEvent(data) {
  const localStorage = window.localStorage;
  //get previously stored log or a blank array.
  let storedLog = localStorage.getItem("grindLogs")
    ? JSON.parse(localStorage.getItem("grindLogs"))
    : [];

  //append new event data
  let updatedLog = storedLog.concat(data);

  //save updatedLog back to local storage
  localStorage.setItem("grindLogs", JSON.stringify(updatedLog));
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
      color: "primary"
    };
  }

  toggleStateAndSave(time) {
    let grinding = this.state.grinding;
    let lastStop = this.state.lastStop;
    let lastStart = this.state.lastStart;
    let lastSession = this.state.lastSession;

    if (this.state.grinding) {
      // record current time as stop time
      lastStop = time;
      lastSession = lastStop - lastStart;
      logEvent({
        event: "STOP",
        time: lastStop,
        tag: "emoji",
        comment: "msg"
      });
      //this.setState({ lastStop: time, lastSession: lastStop - lastStart });
      console.log({ lastStop, lastSession });
    } else {
      // record current time as start time
      lastStart = time;
      logEvent({
        event: "START",
        time: lastStart,
        tag: "#category",
        comment: "msg"
      });
      // this.setState({ lastStart: time });
      console.log({ lastStart });
    }
    //toggle state
    grinding = !grinding;

    //toggle color
    const color = grinding ? "secondary" : "primary";
    this.setState({ grinding, lastStart, lastStop, lastSession, color });
  }

  render() {
    return (
      <Fab
        color={this.state.color}
        onClick={() => this.toggleStateAndSave(Date.now())}
      >
        4m
      </Fab>
    );
  }
}

export default TheButton;
