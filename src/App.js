import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: green
  }
});

//NOT THE PROPER WAY TO STORE STATE! Need to fix!
let lastStart;
let lastStop;
let lastSession;
let grinding = false;
//FIX STATE STORAGE
function toggleState(time) {
  if (grinding) {
    // record current time as stop time
    lastStop = time;
    lastSession = lastStop - lastStart;
    console.log({ lastStop, lastSession });
  } else {
    // record current time as start time
    lastStart = time;
    console.log({ lastStart });
  }
  //toggle state
  grinding = !grinding;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="primary"
        onClick={e => toggleState(Date.now())}
      >
        Hello World
      </Button>
    </ThemeProvider>
  );
}

export default App;
