(function () {

  "use strict";

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  // Access the DOM elements.
  var v = document.getElementById("video"),
      c = document.getElementById("canvas"),
      ctx = c.getContext("2d");

  // Set up the coordinates. 1280.
  var source = {x: 0, y: 0, w: 640, h: 360},
      width = 640,
      dest = {x: 0, y: 0, w: width, h: width * source.h / source.w};

  var playing = false;
  function redraw () {
    if (!playing) return;
    ctx.drawImage(v, source.x, source.y, source.w, source.h,
                  dest.x, dest.y, dest.w, dest.h);
    requestAnimFrame(redraw);
  }

  v.addEventListener("play", function() {
    playing = true;
    requestAnimFrame(redraw);
  }, false);
  v.addEventListener("pause", function() { playing = false; }, false);
  v.addEventListener("ended", function() { playing = false; },false);

  // Do the magic.
  var sources = [
    [0, 0], [640, 0],
    [0, 360], [640, 360]
  ], current = 0;
  function do_the_magic () {
    var i = Math.floor(sources.length*Math.random());
    while (i == current)
      i = Math.floor(sources.length*Math.random());
    var s = sources[i];
    current = i;
    source.x = s[0];
    source.y = s[1];
    if (!playing) {
      v.play();
    }
  }
  c.onclick = do_the_magic;

})();
