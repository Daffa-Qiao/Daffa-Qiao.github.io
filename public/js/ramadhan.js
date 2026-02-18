// when page loads start countdown and bind events
window.addEventListener('DOMContentLoaded', () => {
  startCountdown();

  const revealBtn = document.getElementById('reveal-btn');
  const secretMsg = document.getElementById('secret-message');
  const secretTitle = document.getElementById('secret-title');

  revealBtn.addEventListener('click', () => {
    secretMsg.classList.remove('hidden');
    secretMsg.classList.add('visible');
    secretTitle.textContent = 'Pesan Sayangku:';
    revealBtn.style.display = 'none';
    const audio = document.getElementById('bg-music');
    if (audio) {
      audio.play().catch(() => {
        // autoplay may be blocked; ignore
      });
    }
  });
});

// countdown to a fixed Ramadan date (change as appropriate)
function startCountdown() {
  // example: first day of Ramadan 2026 (approx.)
  const target = new Date('2026-02-19T00:00:00');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  update();
  const timer = setInterval(update, 1000);
}

// optional: simple gallery animation cycle
// cycle through images by fading them every few seconds
(function animateGallery() {
  const images = document.querySelectorAll('.photo-gallery img');
  let idx = 0;
  if (!images.length) return;
  setInterval(() => {
    images.forEach((img, i) => {
      img.style.opacity = i === idx ? '1' : '0.3';
    });
    idx = (idx + 1) % images.length;
  }, 4000);
})();
