var path = require('path')
var KittyCanvas = require('./kitty-canvas')

class Detector {
  constructor(fileName) {
    this.canvas = new KittyCanvas
    this.element = this.canvas.canHazCanvas()
    this.setFileName(fileName)
  }

  getElement() {
    return this.element
  }

  getFileName() {
    return this.fileName
  }

  setFileName(fileName) {
    this.fileName = fileName
    if (fileName) {
      this.fileName = path.resolve(fileName)
      this.fileURL = 'file://' + this.fileName
      this.canvas.drawFromURL(this.fileURL)
    }
  }

  detect() {
    this.canvas.detectFromURL(this.fileURL)
  }
}
module.exports = Detector
