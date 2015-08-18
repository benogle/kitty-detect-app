var Detector = require('./detector')
var detector

require('ipc').on('open-image', function(fileName) {
  detector.setFileName(fileName)
})

window.onload = function() {
  var hash, args, element
  hash = window.location.hash.slice(1)
  args = Object.freeze(JSON.parse(decodeURIComponent(hash)))

  detector = new Detector(args.fileName)
  element = detector.getElement()

  document.querySelector('#image-container').appendChild(element)
  document.querySelector('#button-bar button').addEventListener('click', didClickButton)
}

function didClickButton(event) {
  detector.detect()
}
