class SceneTitle extends AbstractScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var start = new Scene(game)
            game.replaceScene(start)
        })
    }
    draw() {
        this.game.context.fillText('按 k 开始游戏', 100, 200)
    }
}