const audio = $("#audio");
const playButton = $("#playButton");
const progress = $("#progress");
const volume = $("#volume");
playButton.addEventListener("click", async () => {
  if (audio.paused) {
    await audio.play();
    playButton.textContent = "Ⅱ";
  } else {
    audio.pause();
    playButton.textContent = "▶";
  }
});
audio.addEventListener("timeupdate", () => {
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});
progress.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
});
volume.addEventListener("input", () => audio.volume = volume.value);
audio.volume = volume.value;
