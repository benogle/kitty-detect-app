var ApplicationWindow, BrowserWindow, app, ipc, path;

ipc = require('ipc');
app = require('app');
dialog = require('dialog');
path = require('path');
BrowserWindow = require('browser-window');
ApplicationWindow = require('./application-window');

class Application {
  constructor(argv) {
    global.application = this;
    require('crash-reporter').start();

    var fileNameToOpen = argv._[0]
    app.on('ready', () => this.onReady(fileNameToOpen));

    this.gettingStartedWindow = null
  }

  // Called when electron is ready
  onReady(fileNamesToOpen) {
    this.win = this.openWindow(fileNamesToOpen);
  }

  // Called when the user clicks the open menu
  openFileDialog() {
    var options = {
      title: 'Open an Image file',
      properties: ['openFile'],
      filters: [
        { name: 'Image files', extensions: ['jpg', 'jpeg', 'png'] }
      ]
    };

    dialog.showOpenDialog(null, options, (fileNames) => {
      this.openFile(fileNames[0]);
    });
  }

  openFile(fileName) {
    this.win.window.webContents.send('open-image', fileName);
  }

  openWindow(fileName) {
    var win, windowPath;
    windowPath = path.resolve(__dirname, "..", "main-window", "index.html");
    return new ApplicationWindow(windowPath, {
      width: 800,
      height: 800
    }, {fileName: fileName});
  }
}

module.exports = Application;
