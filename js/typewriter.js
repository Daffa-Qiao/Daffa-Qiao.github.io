function typeText(element, text, speed = 42) {
  element.textContent = "";
  let index = 0;
  const tick = () => {
    element.textContent += text.charAt(index);
    index += 1;
    if (index < text.length) window.setTimeout(tick, speed);
  };
  tick();
}
