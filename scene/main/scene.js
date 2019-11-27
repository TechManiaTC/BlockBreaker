var Scene = function(game) {
    var s = {
        game: game
    }
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    blocks = loadLevel(game, 1)  

    s.draw = function() {
        game.drawImage(paddle)
            game.drawImage(ball)
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].alive) {
                    game.drawImage(blocks[i])
                }
            }
            game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = function() {
        ball.move()
        // 游戏结束
        if (ball.y > paddle.y) {
            var end = new SceneEnd(game)
            game.replaceScene(end)
        }
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

    return s
}