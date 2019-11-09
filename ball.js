var Ball = function() {
  var image = imageFromPath('ball.png')
  var o = {
    image: image,
    x: 50,
    y: 150,
    speedX: 3,
    speedY: 3, 
    fired: false,
  }
  o.move = function() {
    if (o.fired) {
      // log('move')
      if (o.x < 0 || o.x > 400 - image.width) {
        o.speedX *= -1
      }
      if (o.y < 0 || o.y > 300) {
        o.speedY *= -1
      }
      o.x += o.speedX
      o.y += o.speedY
    }
  }
  o.fire = function() {
    o.fired = true
  }
  o.rebound = function() {
    o.speedY *= -1
  }
  return o
}