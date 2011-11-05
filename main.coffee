class LaughingMan
  cap:
    outside: 65
    inside:  30
    x_left:  -200
    x_right: 310

  draw_background: ->
    console.log @b
    @b.translate 400, 400
    @b.beginPath()
    @b.fillStyle = "#FFFFFF"
    @b.arc 0, 0, 310, 0, @TWOPI, false
    @b.fill()

  eye: (e) ->
    @c.beginPath()
    @c.arc e.x, e.y, e.r, 3 * Math.PI / 2 - e.t,  3 * Math.PI / 2 + e.t, false
    @c.arc e.x, e.y + 26, e.r + 10, Math.PI / 2 - e.t, Math.PI / 2 + e.t, true
    @c.fill()

  draw_face: ->
    console.log @c
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

    @c.beginPath()
    @c.fillRect -16, -244, 34, 8
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

  setup: ->
    @TWOPI = 2 * Math.PI
    @fps   = 30
    @theta = 0.021

    @cap.width  = @cap.x_right - @cap.x_left
    @cap.height = @cap.outside - @cap.inside

  setup_canvas: (canvas)->
    canvas.width  = 800
    canvas.height = 800
    canvas.getContext "2d"

  build_letterspan: (wrap, char, idx)->
    el = document.createElement "span"
    el.classList.add "w#{idx}"
    el.textContent = char
    wrap.appendChild el
    el

  setup_textwrap: (wrap)->
    txt = "I thought what I'd do was I'd pretend I was one of those deaf-mutes"
    for char, idx in txt.split ''
      @build_letterspan wrap, char, idx
    wrap

  build_element: (setup, tag, klass)->
    el = @top.getElementsByClassName(klass)[0]
    unless el?
      el = document.createElement tag
      el.classList.add "lm_#{klass}"
      @top.appendChild el
    this["setup_#{setup}"] el

  build: (top)->
    @top = top

    @b  = @build_element 'canvas', 'canvas', 'background'
    @el = @build_element 'textwrap',  'div', 'txtwrap'
    @c  = @build_element 'canvas', 'canvas', 'foreground'

  move: (x, y, r)->
    @top.style.left = x
    @top.style.top  = y
    w = r * 2
    w

  constructor: (top)->
    @setup()
    @build top
    @draw_background()
    @draw_face()


setup_laughingman = ->
  for el in document.getElementsByClassName('laughingman')
    new LaughingMan el

if window.addEventListener
  window.addEventListener 'load', setup_laughingman, false
else
  window.alert 'missing: window.addEventListener'




# Local Variables:
# pdkl-recompile-on-save: "make rebuild --no-print-directory"
# pdkl-load-in-firefox-on-save: "laughingman.html"
# End:
