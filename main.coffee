class LaughingMan
  cap:
    outside: 65
    inside:  30
    x_left:  -200
    x_right: 310

  eye: (e) ->
    @c.beginPath()
    @c.arc e.x, e.y, e.r, 3 * Math.PI / 2 - e.t,  3 * Math.PI / 2 + e.t, false
    @c.arc e.x, e.y + 26, e.r + 10, Math.PI / 2 - e.t, Math.PI / 2 + e.t, true
    @c.fill()


  draw_face: ->
    @cap.width  = @cap.x_right - @cap.x_left
    @cap.height = @cap.outside - @cap.inside

    @c.translate 400, 400
    @c.beginPath()
    @c.fillStyle = "#064D76"
    @c.strokeStyle = "#064D76"

    @c.arc 0, 0, 312, 0, @TWOPI, false
    @c.arc 0, 0, 296, 0, @TWOPI, true
    @c.arc 0, 0, 238, 0, @TWOPI, false
    @c.arc 0, 0, 202, 0, @TWOPI, true

    @c.moveTo 0, @cap.inside
    x = Math.PI / 19
    @c.arc 0, 0, 180, x, Math.PI - x, false
    @c.moveTo 0, @cap.outside
    x = x * 2.8
    @c.arc 0, 0, 145, Math.PI - x, x, true
    @c.fill()

    @c.beginPath()
    @c.arc @cap.x_right, 0, 65, 0, @TWOPI, false
    @c.fillRect @cap.x_right - 100, @cap.inside, 100, @cap.height
    @c.fillRect @cap.x_left, 0 - @cap.outside, @cap.width, @cap.height
    @c.fill()

    e =
     x: 95
     y: 30
     r: 50
     t: Math.PI / 2.2

    @eye e
    e.x = -1 * e.x
    @eye e

    @c.beginPath()
    @c.fillStyle = "#FFFFFF"
    @c.arc @cap.x_right, 0, @cap.inside, 0, @TWOPI, true
    @c.fillRect @cap.x_right - 110, 0 - @cap.inside, 110, 2 * @cap.inside
    @c.fillRect -170, 22, 2 * 170, @cap.inside - 22
    @c.fill()

  animate: =>
    @r = @r + @theta
    @el.style.MozTransform = "rotate(#{@r}rad)"
    setTimeout @animate, @period

  constructor: ->
    @TWOPI  = 2 * Math.PI
    @fps    = 30
    @theta  = 0.021
    @r      = 0
    @period = 1000 / @fps
    @el     = document.getElementById("warped")
    @canvas = document.getElementById("overlay")
    @c      = @canvas.getContext("2d")

    @draw_face()
    @animate()

setup = ->
  window.laughing_man = new LaughingMan
