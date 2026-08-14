const storyLines = [
  "Aku masih ingat...",
  "Hari pertama kita bertemu.",
  "Mungkin bagimu biasa saja.",
  "Tapi bagiku...",
  "Hari itu cukup spesial.",
  "Dan sejak itu, aku ingin mengenalmu lebih jauh."
];
const quotes = [
  "Every moment with you is worth remembering.",
  "Some stories begin quietly, then stay beautifully.",
  "Beberapa orang datang tanpa direncanakan, lalu perlahan menjadi alasan kita tersenyum."
];
$("#enterButton").addEventListener("click", () => {
  $("#loadingScreen").classList.add("hide");
  $("#hero").scrollIntoView();
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .18 });
$$(".reveal").forEach((el) => observer.observe(el));
let line = 0;
window.setInterval(() => {
  line = (line + 1) % storyLines.length;
  typeText($("#storyLine"), storyLines[line], 38);
}, 3600);
window.setInterval(() => {
  $("#quoteText").textContent = quotes[Math.floor(Math.random() * quotes.length)];
}, 5200);
$("#envelope").addEventListener("click", () => {
  $("#envelope").classList.add("open");
  $("#letterPaper").classList.add("show");
  typeText($("#letterText"), "Terima kasih sudah meluangkan waktu melihat semua ini. Aku tidak berharap sesuatu yang instan. Aku hanya ingin kamu tahu bahwa aku benar-benar serius ketika ingin mengenalmu.", 32);
});
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("ripple")) {
    const circle = document.createElement("span");
    circle.style.left = `${event.offsetX}px`;
    circle.style.top = `${event.offsetY}px`;
    circle.className = "ripple-dot";
    event.target.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  }
});
