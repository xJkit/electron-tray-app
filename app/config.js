module.exports = {
  mainWindow: {
    options: {
      width: 300,
      height: 500,
      resizable: false,
      show: false,
      frame: false,
      webPreferences: {
        backgroundThrottling: false,
      },
    },
  },
  timerTray: {
    iconName: process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png',
  },
};
