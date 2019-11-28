class Engine {
    constructor(images, runCallback) {
        window.fps = 30
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.init()
    }
    init = () => {
        // events
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
        // loads all images before game start
        var loads= []
        var names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                // 保证所有素材载入后运行游戏
                this.images[name] = img
                loads.push(1)
                if (loads.length === names.length) {
                    this.startGame()
                }
            }
            
        }
    }
    // draw
    drawImage = (img) => {
        this.context.drawImage(img.image, img.x, img.y)
    }
    registerAction = (key, callback) => {
        this.actions[key] = callback
    }
    update = () => {
        if (window.paused) {
            return
        }
        this.scene.update()
    }
    draw = () => {
        this.scene.draw()
    }
    runloop = () => {
        var actions = Object.keys(this.actions)
        // log('this.actions', Object.keys(g))
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (this.keydowns[key]) {
                // if key pressed, call register action
                this.actions[key]()
            }
        }
        // update status
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps)
    }
    imageByName = (name) => {
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    runWithScene = (scene) => {
        this.scene = scene
        // 开始运行程序
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps)
    }
    replaceScene = (scene) => {
        this.scene = scene
    }
    startGame = () => {
        this.runCallback(this)
    }
}
