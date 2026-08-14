const cursor = $(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  document.documentElement.style.setProperty("--mx", `${(event.clientX / innerWidth - .5) * 2}`);
  document.documentElement.style.setProperty("--my", `${(event.clientY / innerHeight - .5) * 2}`);
});
