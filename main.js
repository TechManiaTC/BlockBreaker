var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    log('level', level)
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
        if ('12345567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        } else if (k === 'p') {
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
        ball: 'ball.png',
        paddle: 'paddle.png',
        block: 'block.png',
    }

    var game = Engine(images, function() {
        var paddle = Paddle(game)
        var ball = Ball(game)
        var score = 0
        blocks = loadLevel(game, 1)
    
        game.registerAction('a', function() {
            paddle.moveLeft()
        })
        game.registerAction('d', function() {
            paddle.moveRight()
        })
        game.registerAction('f', function() {
            ball.fire()
        })
        // mouese event
        var enableDrag = false
        window.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            }
        });
        window.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        });
        window.addEventListener('mouseup', function(event) {
            enableDrag = false
        });
    
        game.update = function() {
            if (paused) {
                return
            }
    
            ball.move()
            // 板球相撞则反弹
            if (paddle.collide(ball)) {
                ball.rebound()
            }
            // 每帧循环所有砖块判断是否和球相撞
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].collide(ball)) {
                    blocks[i].kill()
                    ball.rebound()
                    // update score
                    score += 100
                }
            }
        }
    
        game.draw = function() {
            game.drawImage(paddle)
            game.drawImage(ball)
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].alive) {
                    game.drawImage(blocks[i])
                }
            }
            game.context.fillText('分数: ' + score, 10, 290)
        }
    })

    enableDebugMode(game, true)
}

main()