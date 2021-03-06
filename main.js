var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    // log('level', level)
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p, game)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(e) {
        var k = e.key
        if ('1234567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        } else if (e.code === 'Space') {
            paused = !paused
        }
    })
    document.querySelector('#id-input-speed')
            .addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    });
}

var main = function() {
    var images = {
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
        block: 'img/block.png',
    }

    var game = new Engine(images, function(g) {
        var scene = new SceneTitle(game)
        g.runWithScene(scene)
    })

    enableDebugMode(game, true)
}

main()