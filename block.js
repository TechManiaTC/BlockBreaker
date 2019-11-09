var Block = function() {
  var image = imageFromPath('block.png')
  var o = {
    image: image,
    x: 150,
    y: 100,
    alive: true,
  }
  o.kill = function() {
    o.alive = false
  }
  o.intersectRect = function(o1, o2) {
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
  o.collide = function(ball) {
    if (o.alive && o.intersectRect(ball, o)) {
      log('block 相撞')
      return true
    }
    return false
  }
  return o
}