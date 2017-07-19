const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
  constructor({ options, url }) {
    super(options);
    this.loadURL(url);
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
