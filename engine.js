var Engine = function() {
  var g = {
    actions: {},
    keydowns: {},
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context
  g.paused = false
  // draw
  g.drawImage = function(image) {
    g.context.drawImage(image.image, image.x, image.y)
  }
  // events
  window.addEventListener('keydown', function(event) {
    g.keydowns[event.key] = true
  })
  window.addEventListener('keyup', function(event) {
    g.keydowns[event.key] = false
  })
  window.addEventListener('keydown', function(event) {
    if (event.key === 'p') {
      g.paused = !g.paused
    }
  })
  // registerAction
  g.registerAction = function(key, callback) {
    g.actions[key] = callback
  }

  setInterval(function() {
    var actions = Object.keys(g.actions)
    // log('g.actions', Object.keys(g))
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i]
      if  (g.keydowns[key]) {
        // if key pressed, call register action
        g.actions[key]()
      }
    }
    // update status
    g.update()
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    g.draw()
  }, 1000/45)
  return g
}