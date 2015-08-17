var path = require('path')

class Main {
  constructor(fileName) {
    this.element = document.createElement('img')
    // this.element.textContent = '🎉 ' + fileName + ' 🎉'
    this.element.src = 'file://' + path.resolve(fileName)
  }

  getElement() {
    return this.element
  }
}
module.exports = Main
