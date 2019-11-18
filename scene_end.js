var SceneEnd = function(game) {
    var s = {
        game: game
    }
    game.registerAction('g', function() {
        var start = Scene(game)
        game.replaceScene(start)
    })

    s.draw = function() {
        game.context.fillText('游戏结束，按 g 重新开始', 100, 200)
    }

    s.update = function() {
    }
    return s
}