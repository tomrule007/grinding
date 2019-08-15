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
import { app, BrowserWindow, Menu, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

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

// All Windows
let mainWindow;
let logWindow;
let chartWindow;
// let crashPrompt; //Prompt to fix incomplete sessions on start (delete it, resume it, end it (set time))
// let startPrompt; //Where you set tag/goal
// let stopPrompt;  //Where you set mood/comments

// WINDOW FACTORY (will refactor all these into one generic Factory Function)

function createChartWindowAndShow() {
  if (chartWindow) {
    console.log('Already Exists');
    chartWindow.show();
    chartWindow.focus();
    return;
  }
  console.log('Creating Log Window');
  chartWindow = new BrowserWindow({
    show: false,
    title: 'Grinding Log',
    width: 1100,
    height: 550
  });
  chartWindow.setMenuBarVisibility(false);
  chartWindow.setVisibleOnAllWorkspaces(true);
  chartWindow.loadURL(`file://${__dirname}/app.html#/chart`);

  chartWindow.webContents.on('did-finish-load', () => {
    if (!chartWindow) {
      throw new Error('"chartWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      chartWindow.minimize();
    } else {
      chartWindow.show();
      chartWindow.focus();
    }
  });

  chartWindow.on('closed', () => {
    chartWindow = null;
  });
}

function createLogWindowAndShow() {
  if (logWindow) {
    console.log('Already Exists');
    logWindow.show();
    logWindow.focus();
    return;
  }
  console.log('Creating Log Window');
  logWindow = new BrowserWindow({
    show: false,
    title: 'Grinding Log',
    width: 1100,
    height: 550
  });
  logWindow.setMenuBarVisibility(false);
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

  // mainWindow: Context Menu Setup
  mainWindow.webContents.on('context-menu', () => {
    Menu.buildFromTemplate([
      {
        label: 'View Log',
        click() {
          console.log('clicked View Log');
          createLogWindowAndShow();
        }
      },
      {
        label: 'View Chart',
        click() {
          console.log('clicked View Chart');
          createChartWindowAndShow();
        }
      },
      { type: 'separator' },
      {
        label: 'Preferences',
        click() {
          // TODO: Open preference window
        }
      },
      {
        label: 'GitHub Repo',
        click() {
          shell.openExternal('https://github.com/tomrule007/grinding');
        }
      },
      { type: 'separator' },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => {
          mainWindow.toggleDevTools();
        }
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        }
      }
    ]).popup(mainWindow);
  });
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
}
// WINDOW FACTORY END

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
