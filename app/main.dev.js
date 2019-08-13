/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
// import { create } from 'handlebars';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
// All Windows
let mainWindow = null;
let logWindow;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => setTimeout(createWindow, 100));

// NEED TO MOVE TO SEPARATE 'LogWindow.js' FILE!

function createLogWindow() {
  if (logWindow) {
    console.log('Already Exists');
    logWindow.show();
    logWindow.focus();
    return;
  }
  console.log('Creating Log Window');
  logWindow = new BrowserWindow({
    show: false,
    width: 500,
    height: 500
  });

  logWindow.setVisibleOnAllWorkspaces(true);
  logWindow.loadURL(`file://${__dirname}/app.html#/log`);

  logWindow.webContents.on('did-finish-load', () => {
    if (!logWindow) {
      throw new Error('"logWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      logWindow.minimize();
    } else {
      logWindow.show();
      logWindow.focus();
    }
  });

  logWindow.on('closed', () => {
    logWindow = null;
  });
}
// END MOVE SECTION

async function createWindow() {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }
  // determine desktop size to place window in top righthand corner (offset to not block minimize/close buttons.)
  const { width } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  const defaultX = width * 0.85;

  mainWindow = new BrowserWindow({
    show: false,
    width: 75, // 90
    height: 75, // 70
    y: 0,
    x: defaultX,
    focusable: false, // makes window stay on top and visible in all workspaces on linux
    resizable: false,
    transparent: true,
    frame: false
  });

  createLogWindow();
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
  menuBuilder.buildCtxMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
}
