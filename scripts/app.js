const wishes = [
  "Selamat ulang tahun, adikku. Semoga senyummu hari ini secerah langit pagi.",
  "Semoga adikku selalu sehat, bahagia, dan makin semangat mengejar cita-cita.",
  "Terima kasih sudah jadi adik yang bikin keluarga ini lebih hangat setiap hari.",
  "Tumbuhlah jadi pribadi yang kuat, baik hati, dan selalu percaya diri."
];

const wishEl = document.getElementById("typed-wish");
const surpriseBtn = document.getElementById("surprise-btn");
const musicBtn = document.getElementById("music-btn");
const messageCard = document.getElementById("message-card");
const blessingTextEl = document.getElementById("blessing-text");
const newBlessingBtn = document.getElementById("new-blessing-btn");
const copyBlessingBtn = document.getElementById("copy-blessing-btn");
const copyStatusEl = document.getElementById("copy-status");

const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let confettiParticles = [];
let confettiActive = false;
let wishIndex = 0;
let blessingIndex = 0;
let isMusicPlaying = false;
let audioCtx;
let tuneTimer;

const blessings = [
  "Semoga adikku diberi umur panjang, badan yang sehat, dan hati yang selalu ceria.",
  "Semoga setiap langkah adikku dimudahkan, dan semua impiannya didekatkan satu per satu.",
  "Semoga adikku selalu dilindungi, dijauhkan dari hal buruk, dan dikelilingi teman-teman baik.",
  "Semoga tahun ini jadi tahun penuh prestasi, kebahagiaan, dan momen yang membanggakan.",
  "Semoga semua doa terbaik untuk adikku dikabulkan di waktu yang paling tepat."
];

function showNewBlessing() {
  blessingIndex = (blessingIndex + 1) % blessings.length;
  blessingTextEl.style.opacity = "0";

  setTimeout(() => {
    blessingTextEl.textContent = blessings[blessingIndex];
    blessingTextEl.style.opacity = "1";
    copyStatusEl.textContent = "Doa berhasil diperbarui.";
  }, 180);
}

async function copyBlessing() {
  const text = blessingTextEl.textContent;

  try {
    await navigator.clipboard.writeText(text);
    copyStatusEl.textContent = "Doa berhasil disalin.";
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
    copyStatusEl.textContent = "Doa disalin dengan mode kompatibilitas browser.";
  }
}

function rotateWishes() {
  wishEl.style.opacity = "0";
  setTimeout(() => {
    wishIndex = (wishIndex + 1) % wishes.length;
    wishEl.textContent = wishes[wishIndex];
    wishEl.style.opacity = "1";
  }, 240);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function burstConfetti() {
  const colors = ["#fb7185", "#f59e0b", "#22c55e", "#3b82f6", "#0ea5a4", "#ef4444"];

  for (let i = 0; i < 180; i += 1) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      radius: Math.random() * 4 + 2,
      speedY: Math.random() * 4 + 1,
      speedX: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.1
    });
  }

  confettiActive = true;
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.angle += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
    ctx.restore();
  });

  confettiParticles = confettiParticles.filter((p) => p.y < canvas.height + 20);

  if (confettiActive || confettiParticles.length > 0) {
    requestAnimationFrame(drawConfetti);
  }
}

function startConfetti() {
  burstConfetti();
  if (confettiParticles.length > 0) {
    drawConfetti();
  }

  setTimeout(() => {
    confettiActive = false;
  }, 2000);
}

function setupAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(frequency, duration, startAt) {
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = frequency;
  gain.gain.value = 0.0001;

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

function startMusic() {
  setupAudio();
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const pattern = [523.25, 659.25, 783.99, 659.25, 698.46, 659.25, 587.33, 523.25];
  let index = 0;

  tuneTimer = setInterval(() => {
    const now = audioCtx.currentTime;
    playTone(pattern[index], 0.34, now);
    index = (index + 1) % pattern.length;
  }, 360);

  isMusicPlaying = true;
  musicBtn.textContent = "Hentikan Musik";
}

function stopMusic() {
  clearInterval(tuneTimer);
  isMusicPlaying = false;
  musicBtn.textContent = "Putar Musik";
}

surpriseBtn.addEventListener("click", () => {
  startConfetti();
  messageCard.classList.remove("hidden");
});

musicBtn.addEventListener("click", () => {
  if (!isMusicPlaying) {
    startMusic();
  } else {
    stopMusic();
  }
});

newBlessingBtn.addEventListener("click", showNewBlessing);
copyBlessingBtn.addEventListener("click", copyBlessing);

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
setInterval(rotateWishes, 3400);
