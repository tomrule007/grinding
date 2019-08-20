import { remote } from 'electron';

const { BrowserWindow } = remote;

export const startWin = {
  win: null, // should be private
  create() {
    console.log('Creating Log Window');
    this.win = new BrowserWindow({
      show: false,
      transparent: true,
      frame: false,
      title: 'Grinding: Start Prompt'
    });
    this.win.setMenuBarVisibility(false);
    this.win.setVisibleOnAllWorkspaces(true);
    this.win.loadURL(`file://${__dirname}/app.html#/start`);

    this.win.webContents.on('did-finish-load', () => {
      if (!this.win) {
        throw new Error('"this.win" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.win.minimize();
      } else {
        this.win.maximize();
        this.win.show();
        this.win.focus();
      }
    });
  },
  close() {
    this.win.close();
    this.win = null;
  }
};
export const stopWin = {
  win: null, // should be private
  create() {
    console.log('Creating Log Window');
    this.win = new BrowserWindow({
      show: false,
      transparent: true,
      frame: false,
      title: 'Stop Grinding'
    });
    this.win.setMenuBarVisibility(false);
    this.win.setVisibleOnAllWorkspaces(true);
    this.win.loadURL(`file://${__dirname}/app.html#/stop`);

    this.win.webContents.on('did-finish-load', () => {
      if (!this.win) {
        throw new Error('"this.win" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.win.minimize();
      } else {
        this.win.maximize();
        this.win.show();
        this.win.focus();
      }
    });
  },
  close() {
    this.win.close();
    this.win = null;
  }
};
