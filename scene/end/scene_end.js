class SceneEnd extends AbstractScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var start = new SceneTitle(game)
            game.replaceScene(start)
        })
    }
    draw() {
        this.game.context.fillText('游戏结束，按 r 返回标题界面', 100, 200)
    }
}