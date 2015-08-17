var Main = require('./main')

window.onload = function() {
  var hash, args, element
  hash = window.location.hash.slice(1)
  args = Object.freeze(JSON.parse(decodeURIComponent(hash)))
  var element = new Main(args.fileName).getElement()

  document.querySelector('#image-container').appendChild(element)
}
