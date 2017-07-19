const path = require('path');
const { app, BrowserWindow, Tray } = require('electron');

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    resizable: false,
    show: false,
    frame: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // tray icon path
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `src/assets/${iconName}`);
  tray = new Tray(iconPath);
  tray.on('click', (evt, bounds) => {
    const { x, y } = bounds;
    const { width, height } = mainWindow.getBounds();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        x: x - (width / 2),
        y: process.platform === 'darwin' ? y : y - height,
        width,
        height,
      });
      mainWindow.show();
    }
  });
  mainWindow.on('blur', () => mainWindow.hide());
});

app.on('closed', () => app.quit());
