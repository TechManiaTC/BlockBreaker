var Engine = function(images, runCallback) {
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {}
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
    g.update = function() {
        if (paused) {
            return
        }
        g.scene.update()

    }
    g.draw = function() {
        g.scene.draw()
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
    var loads= []
    var names = Object.keys(images)
    // loads all images before game start
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 保证所有素材载入后运行游戏
            g.images[name] = img
            loads.push(1)
            if (loads.length === names.length) {
                g.startGame()
            }
        }
        
    }
    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.runWithScene = function(scene) {
        g.scene = scene
        // 开始运行程序
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps)
    }
    g.replaceScene = function(scene) {
        g.scene = scene
    }
    g.startGame = function() {
        runCallback(g)
    }
    return g
}
