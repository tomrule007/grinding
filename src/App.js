import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import lightGreen from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/styles";
import TheButton from "./components/TheButton";

const theme = createMuiTheme({
  palette: {
    primary: red, //offState
    secondary: lightGreen //onState
  }
});

function App() {
  return (
    <div style={{ paddingTop: 2, paddingLeft: 15 }}>
      <ThemeProvider theme={theme}>
        <TheButton />
      </ThemeProvider>
    </div>
  );
}

export default App;
