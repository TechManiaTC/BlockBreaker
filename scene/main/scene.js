class Scene extends AbstractScene {
    constructor(game) {
        super(game)
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.score = 0
        this.blocks = loadLevel(game, 1)
        this.enableDrag = false
        game.registerAction('r', function() {
            var start = new SceneTitle(this.game)
            this.game.replaceScene(start)
        })
        this.move(this.paddle, this.ball)
        this.mouse(this.ball, this.enableDrag)
    }
    draw() {
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].alive) {
                this.game.drawImage(this.blocks[i])
            }
        }
        this.game.context.fillText('分数: ' + this.score, 10, 290)
    }
    update() {
        this.ball.move()
        // 游戏结束
        if (this.ball.y > this.paddle.y) {
            var end = new SceneEnd(this.game)
            this.game.replaceScene(end)
        }
        // 板球相撞则反弹
        if (this.paddle.collide(this.ball)) {
            this.ball.rebound()
        }
        // 每帧循环所有砖块判断是否和球相撞
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].collide(this.ball)) {
                this.blocks[i].kill()
                this.ball.rebound()
                // update score
                this.score += 100
            }
        }
    }
    // move
    move(paddle, ball) {
        this.game.registerAction('a', function() {
            paddle.moveLeft()
        })
        this.game.registerAction('d', function() {
            paddle.moveRight()
        })
        this.game.registerAction('f', function() {
            ball.fire()
        })
    }
    // mouese event
    mouse(ball, enableDrag) {
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
    }
}
