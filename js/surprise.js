function floatHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-pop";
  heart.textContent = Math.random() > .5 ? "❤️" : "✨";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${Math.random() * 1.8 + 1.2}rem`;
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 4200);
}
$("#surpriseButton").addEventListener("click", (event) => {
  burst(event.clientX, event.clientY);
  for (let i = 0; i < 36; i += 1) window.setTimeout(floatHeart, i * 55);
});
$("#finalButton").addEventListener("click", (event) => {
  burst(event.clientX, event.clientY);
  for (let i = 0; i < 60; i += 1) window.setTimeout(floatHeart, i * 40);
});
