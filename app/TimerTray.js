const { app, Tray, Menu } = require('electron');

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
    this.setToolTip('Timer App'); // method in parent class
  }

  onClick(evt, bounds) {
    const { x, y } = bounds;
    const { width, height } = this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: x - (width / 2),
        y: process.platform === 'darwin' ? y : y - height,
        width,
        height,
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit(),
      },
    ]);
    this.popUpContextMenu(menuConfig); // originall Tray method
  }
}

module.exports = TimerTray;
