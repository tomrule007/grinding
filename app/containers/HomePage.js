// @flow
import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';
import TheButton from '../components/TheButton';

type Props = {};

const theme = createMuiTheme({
  palette: {
    primary: red, // offState
    secondary: lightGreen // onState
  }
});

const electron = require('electron');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
console.log(userDataPath);
export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TheButton />
      </ThemeProvider>
    );
  }
}
