var SceneEnd = function(game) {
    var s = {
        game: game
    }
    game.registerAction('r', function() {
        var start = SceneTitle(game)
        game.replaceScene(start)
    })

    s.draw = function() {
        game.context.fillText('游戏结束，按 r 返回标题界面', 100, 200)
    }

    s.update = function() {
    }
    return s
}