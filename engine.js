var Engine = function() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
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
    // registerAction
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    window.fps = 30
    var runloop = function() {
        var actions = Object.keys(g.actions)
        // log('g.actions', Object.keys(g))
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
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
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps)
    }

    setTimeout(function() {
        runloop()
    }, 1000 / window.fps)
    return g
}
