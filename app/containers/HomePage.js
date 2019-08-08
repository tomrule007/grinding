// @flow
import React, { Component } from 'react';
import TheButton from '../components/TheButton';

type Props = {};

const electron = require('electron');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
console.log(userDataPath);
export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <TheButton />;
  }
}
