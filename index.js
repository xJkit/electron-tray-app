const path = require('path');
const TimerTray = require('./app/TimerTray');
const { app, BrowserWindow } = require('electron');

let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    resizable: false,
    show: false,
    frame: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => mainWindow.hide());

  // tray icon path
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
  // directly new without variable has garbage collection issue
});

app.on('closed', () => app.quit());
