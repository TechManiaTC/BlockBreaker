var SceneTitle = function(game) {
    var s = {
        game: game
    }
    game.registerAction('k', function() {
        var start = Scene(game)
        game.replaceScene(start)
    })

    s.draw = function() {
        game.context.fillText('按 k 开始游戏', 100, 200)
    }

    s.update = function() {
    }
    return s
}