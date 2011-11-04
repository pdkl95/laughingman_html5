var LaughingMan, setup;
LaughingMan = (function() {
  LaughingMan.prototype.cap = {
    outside: 65,
    inside: 30,
    x_left: -200,
    x_right: 310
  };
  LaughingMan.prototype.draw_background = function() {
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
  function LaughingMan() {
    this.TWOPI = 2 * Math.PI;
    this.fps = 30;
    this.theta = 0.021;
    this.cap.width = this.cap.x_right - this.cap.x_left;
    this.cap.height = this.cap.outside - this.cap.inside;
    this.el = document.getElementById("warped");
    this.canvas = document.getElementById("overlay");
    this.bgnd = document.getElementById("overlay_background");
    this.c = this.canvas.getContext("2d");
    this.b = this.bgnd.getContext("2d");
    this.draw_background();
    this.draw_face();
  }
  return LaughingMan;
})();
setup = function() {
  return window.laughing_man = new LaughingMan;
};