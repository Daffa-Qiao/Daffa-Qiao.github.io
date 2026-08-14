const starCanvas = $("#starCanvas");
const starCtx = starCanvas.getContext("2d");
let stars = [];
function resizeStars() {
  starCanvas.width = window.innerWidth * devicePixelRatio;
  starCanvas.height = window.innerHeight * devicePixelRatio;
  stars = Array.from({ length: Math.floor(window.innerWidth / 5) }, () => ({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: Math.random() * 1.8 + .4,
    v: Math.random() * .22 + .05,
    a: Math.random()
  }));
}
function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach((s) => {
    s.y += s.v * devicePixelRatio;
    s.a += .015;
    if (s.y > starCanvas.height) s.y = 0;
    starCtx.globalAlpha = .35 + Math.sin(s.a) * .25;
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r * devicePixelRatio, 0, Math.PI * 2);
    starCtx.fillStyle = "#fff";
    starCtx.fill();
  });
  requestAnimationFrame(drawStars);
}
window.addEventListener("resize", resizeStars);
resizeStars();
drawStars();
