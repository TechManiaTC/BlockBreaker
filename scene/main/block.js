var Block = function(position, game) {
    // position是坐标 [0, 0]
    var img = game.imageByName('block')
    var o = {
        x: position[0],
        y: position[1],
        alive: true,
        health: position[2] || 1,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function() {
        o.health -= 1
        if (o.health < 1) {
            o.alive = false
        }
    }
    o.intersectRect = function(o1, o2) {
        var ax1 = o1.x
        var ax2 = o1.x + o1.w
        var ay1 = o1.y
        var ay2 = o1.y + o1.h
        var bx1 = o2.x
        var bx2 = o2.x + o2.w
        var by1 = o2.y
        var by2 = o2.y + o2.h
        // log(ax1,ax2,ay1,ay2,bx1,bx2,by1,by2)
        return ((ax1 <= bx2) && (ax2 >= bx1) && (ay1 <= by2) && (ay2 >= by1))
    }
    o.collide = function(ball) {
        if (o.alive && o.intersectRect(ball, o)) {
            log('block 相撞')
            return true
        }
        return false
    }
    return o
}
