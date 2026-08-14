window.addEventListener("pointermove", (event) => {
  const x = event.clientX / innerWidth - .5;
  const y = event.clientY / innerHeight - .5;
  $$(".layer").forEach((layer) => {
    const depth = Number(layer.dataset.depth || 8);
    layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
  });
});
$$(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `rotateX(${y * -9}deg) rotateY(${x * 9}deg) translateY(-8px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});
