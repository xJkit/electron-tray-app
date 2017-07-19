const path = require('path');
const windowConfig = require('./app/config');
const MainWindow = require('./app/MainWindow');
const TimerTray = require('./app/TimerTray');
const { app, ipcMain } = require('electron');

// path
const srcRoot = path.join(__dirname, 'src');

let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide(); // hide app from dock on Mac OS
  mainWindow = new MainWindow({
    options: windowConfig.mainWindow.options,
    url: `file://${srcRoot}/index.html`,
  });
  tray = new TimerTray(`${srcRoot}/assets/${windowConfig.timerTray.iconName}`, mainWindow);
});

app.on('closed', () => app.quit());

ipcMain.on('update-timer', (evt, timeTitle) => {
  tray.setTitle(timeTitle);
});
