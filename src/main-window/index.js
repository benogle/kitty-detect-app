window.onload = function() {
  var Main = require('./main')
  var element = new Main().getElement()
  document.body.appendChild(element)
}
