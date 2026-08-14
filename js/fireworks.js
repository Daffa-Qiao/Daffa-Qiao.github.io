const fireworkCanvas = $("#fireworkCanvas");
const fireworkCtx = fireworkCanvas.getContext("2d");
let sparks = [];
function resizeFireworks() {
  fireworkCanvas.width = innerWidth * devicePixelRatio;
  fireworkCanvas.height = innerHeight * devicePixelRatio;
}
function burst(x = innerWidth / 2, y = innerHeight / 2) {
  for (let i = 0; i < 90; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    sparks.push({ x: x * devicePixelRatio, y: y * devicePixelRatio, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 80, hue: Math.random() * 80 + 300 });
  }
}
function drawFireworks() {
  fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
  sparks = sparks.filter((spark) => spark.life > 0);
  sparks.forEach((spark) => {
    spark.x += spark.vx * devicePixelRatio;
    spark.y += spark.vy * devicePixelRatio;
    spark.vy += .035 * devicePixelRatio;
    spark.life -= 1;
    fireworkCtx.globalAlpha = spark.life / 80;
    fireworkCtx.fillStyle = `hsl(${spark.hue}, 95%, 68%)`;
    fireworkCtx.beginPath();
    fireworkCtx.arc(spark.x, spark.y, 2.2 * devicePixelRatio, 0, Math.PI * 2);
    fireworkCtx.fill();
  });
  requestAnimationFrame(drawFireworks);
}
window.addEventListener("resize", resizeFireworks);
resizeFireworks();
drawFireworks();
