var Paddle = function () {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 10,
    }
    o.move = function (x) {
        if (x <= 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(o.x - o.speed)
    }
    o.moveRight = function () {
        o.move(o.x + o.speed)
    }
    o.intersectRect = function (o1, o2) {
        var ax1 = o1.x
        var ax2 = o1.x + o1.image.width
        var ay1 = o1.y
        var ay2 = o1.y + o1.image.height

        var bx1 = o2.x
        var bx2 = o2.x + o2.image.width
        var by1 = o2.y
        var by2 = o2.y + o2.image.height
        // log(ax1,ax2,ay1,ay2,bx1,bx2,by1,by2)
        return ((ax1 <= bx2) && (ax2 >= bx1) && (ay1 <= by2) && (ay2 >= by1))
    }
    o.collide = function (ball) {
        if (o.intersectRect(ball, o)) {
            log('相撞')
            return true
        }
        return false
    }
    return o
}