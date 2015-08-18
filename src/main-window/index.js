var Detector = require('./detector')

window.onload = function() {
  var hash, args, element, main
  hash = window.location.hash.slice(1)
  args = Object.freeze(JSON.parse(decodeURIComponent(hash)))

  main = new Detector(args.fileName)
  element = main.getElement()

  document.body.appendChild(element)

  main.detect()
}
