var Detector = require('./detector')
var detector

require('ipc').on('open-image', function(fileName) {
  resetStatus()
  detector.setFileName(fileName)
})

window.onload = function() {
  var hash, args, element
  hash = window.location.hash.slice(1)
  args = Object.freeze(JSON.parse(decodeURIComponent(hash)))

  detector = new Detector(args.fileName)
  element = detector.getElement()
  initStatusUpdater()
  document.querySelector('#image-container').appendChild(element)
  document.querySelector('#button-bar button').addEventListener('click', didClickButton)
}

function didClickButton(event) {
  document.querySelector('#status').textContent = 'Detecting...'
  detector.detect()
}

function resetStatus() {
  document.querySelector('#status').textContent = 'Ready.'
}

function initStatusUpdater() {
  var statusElement = document.querySelector('#status')
  var progressCount = 0

  detector.on('progress', function(args) {
    var progressStr = "Detecting"
    for (var i = 0; i < progressCount % 5; i++)
      progressStr += '.'
    statusElement.textContent = progressStr
    progressCount++
  })

  detector.on('found', function(args) {
    if (args.catFaces == 0)
      statusElement.textContent = 'Found NO cat faces 😞'
    else
      statusElement.textContent = "Found " + pluralize(args.catFaces, 'cat face')
  })
}

function pluralize(num, word) {
  if (num == 1)
    return num + ' ' + word
  else
    return num + ' ' + word + 's'
}
