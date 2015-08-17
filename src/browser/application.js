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

    var fileNamesToOpen = argv._
    app.on('ready', () => this.onReady(fileNamesToOpen));

    ipc.on('call-window-method', (event, method, ...args) => {
      let win = BrowserWindow.fromWebContents(event.sender)
      win[method](...args)
    })

    this.windows = [];
    this.gettingStartedWindow = null
  }

  // Called when electron is ready
  onReady(fileNamesToOpen) {
    if (fileNamesToOpen.length)
      this.openFiles(fileNamesToOpen);
    else
      this.openWindow()
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
      this.openFiles(fileNames);
    });
  }

  openFiles(fileNames) {
    if (fileNames && fileNames.length){
      for (let fileName of fileNames)
        this.openWindow(fileName)
    }
  }

  openWindow(fileName) {
    var win, windowPath;
    windowPath = path.resolve(__dirname, "..", "main-window", "index.html");
    win = new ApplicationWindow(windowPath, {
      width: 1200,
      height: 800
    }, {fileName: fileName});
    this.addWindow(win);
  }

  removeWindow(win) {
    this.windows.splice(this.windows.indexOf(win), 1);
  }

  addWindow(win) {
    this.windows.push(win);
    win.on("closed", (function(_this) {
      return function() {
        return _this.removeWindow(win);
      };
    })(this));
  }
}

module.exports = Application;
