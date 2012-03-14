var LaughingMan, setup_laughingman;

LaughingMan = (function() {

  LaughingMan.prototype.cap = {
    outside: 65,
    inside: 30,
    x_left: -200,
    x_right: 310
  };

  LaughingMan.prototype.draw_background = function() {
    console.log(this.b);
    this.b.translate(400, 400);
    this.b.beginPath();
    this.b.fillStyle = "#FFFFFF";
    this.b.arc(0, 0, 310, 0, this.TWOPI, false);
    return this.b.fill();
  };

  LaughingMan.prototype.eye = function(e) {
    this.c.beginPath();
    this.c.arc(e.x, e.y, e.r, 3 * Math.PI / 2 - e.t, 3 * Math.PI / 2 + e.t, false);
    this.c.arc(e.x, e.y + 26, e.r + 10, Math.PI / 2 - e.t, Math.PI / 2 + e.t, true);
    return this.c.fill();
  };

  LaughingMan.prototype.draw_face = function() {
    var e, x;
    console.log(this.c);
    this.c.translate(400, 400);
    this.c.beginPath();
    this.c.fillStyle = "#064D76";
    this.c.strokeStyle = "#064D76";
    this.c.arc(0, 0, 312, 0, this.TWOPI, false);
    this.c.arc(0, 0, 296, 0, this.TWOPI, true);
    this.c.arc(0, 0, 238, 0, this.TWOPI, false);
    this.c.arc(0, 0, 202, 0, this.TWOPI, true);
    this.c.moveTo(0, this.cap.inside);
    x = Math.PI / 19;
    this.c.arc(0, 0, 180, x, Math.PI - x, false);
    this.c.moveTo(0, this.cap.outside);
    x = x * 2.8;
    this.c.arc(0, 0, 145, Math.PI - x, x, true);
    this.c.fill();
    this.c.beginPath();
    this.c.arc(this.cap.x_right, 0, 65, 0, this.TWOPI, false);
    this.c.fillRect(this.cap.x_right - 100, this.cap.inside, 100, this.cap.height);
    this.c.fillRect(this.cap.x_left, 0 - this.cap.outside, this.cap.width, this.cap.height);
    this.c.fill();
    this.c.beginPath();
    this.c.fillRect(-16, -244, 34, 8);
    this.c.fill();
    e = {
      x: 95,
      y: 30,
      r: 50,
      t: Math.PI / 2.2
    };
    this.eye(e);
    e.x = -1 * e.x;
    this.eye(e);
    this.c.beginPath();
    this.c.fillStyle = "#FFFFFF";
    this.c.arc(this.cap.x_right, 0, this.cap.inside, 0, this.TWOPI, true);
    this.c.fillRect(this.cap.x_right - 110, 0 - this.cap.inside, 110, 2 * this.cap.inside);
    this.c.fillRect(-170, 22, 2 * 170, this.cap.inside - 22);
    return this.c.fill();
  };

  LaughingMan.prototype.setup = function() {
    this.TWOPI = 2 * Math.PI;
    this.fps = 30;
    this.theta = 0.021;
    this.cap.width = this.cap.x_right - this.cap.x_left;
    return this.cap.height = this.cap.outside - this.cap.inside;
  };

  LaughingMan.prototype.setup_canvas = function(canvas) {
    canvas.width = 800;
    canvas.height = 800;
    return canvas.getContext("2d");
  };

  LaughingMan.prototype.build_pointspan = function(wrap, char, idx) {
    var el;
    el = document.createElement("span");
    el.classList.add("w" + idx);
    el.style.backgroundColor = 'red';
    el.textContent = ' ';
    wrap.appendChild(el);
    return el;
  };

  LaughingMan.prototype.build_letterspan = function(wrap, char, idx) {
    var el, height;
    el = document.createElement("span");
    el.classList.add("w" + idx);
    el.textContent = char;
    el.style.borderLeft = '1px solid #f33';
    el.style.borderBottom = '1px solid #3f3';
    el.style.color = '#555';
    el.style.line - (height = 1);
    el.style.fontSize = '18px';
    wrap.appendChild(el);
    return el;
  };

  LaughingMan.prototype.setup_textwrap = function(wrap) {
    var char, idx, txt, _len, _ref;
    txt = "I thought what I'd do was I'd pretend I was one of those deaf-mutes";
    _ref = txt.split('');
    for (idx = 0, _len = _ref.length; idx < _len; idx++) {
      char = _ref[idx];
      this.build_letterspan(wrap, char, idx);
    }
    return wrap;
  };

  LaughingMan.prototype.build_element = function(setup, tag, klass) {
    var el;
    el = this.top.getElementsByClassName(klass)[0];
    if (el == null) {
      el = document.createElement(tag);
      el.classList.add("lm_" + klass);
      this.top.appendChild(el);
    }
    return this["setup_" + setup](el);
  };

  LaughingMan.prototype.build = function(top) {
    this.top = top;
    this.b = this.build_element('canvas', 'canvas', 'background');
    this.el = this.build_element('textwrap', 'div', 'txtwrap');
    return this.c = this.build_element('canvas', 'canvas', 'foreground');
  };

  LaughingMan.prototype.move = function(x, y, r) {
    var w;
    this.top.style.left = x;
    this.top.style.top = y;
    w = r * 2;
    return w;
  };

  function LaughingMan(top) {
    this.setup();
    this.build(top);
    this.draw_face();
  }

  return LaughingMan;

})();

setup_laughingman = function() {
  var el, _i, _len, _ref, _results;
  _ref = document.getElementsByClassName('laughingman');
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    el = _ref[_i];
    _results.push(new LaughingMan(el));
  }
  return _results;
};

if (window.addEventListener) {
  window.addEventListener('load', setup_laughingman, false);
} else {
  window.alert('missing: window.addEventListener');
}
