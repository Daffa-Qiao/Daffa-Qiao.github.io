const timelineData = [
  ["Hari Pertama", "Saat pertama kali kita bertemu", "Mungkin sederhana, tapi ada hal kecil yang membuatku mengingatnya."],
  ["Obrolan Kecil", "Saat percakapan terasa nyaman", "Aku suka bagaimana pembicaraan ringan bisa terasa hangat."],
  ["Senyum Itu", "Momen yang diam-diam kusimpan", "Ada beberapa hal kecil yang membuat hari biasa jadi lebih baik."],
  ["Cerita Baru", "Mulai dari sini", "Aku berharap kita bisa membuat lebih banyak cerita yang layak dikenang."]
];
const modal = $("#timelineModal");
$$(".timeline-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    const data = timelineData[Number(dot.dataset.index)];
    $("#modalTitle").textContent = data[0];
    $("#modalDate").textContent = data[1];
    $("#modalStory").textContent = data[2];
    modal.showModal();
  });
});
$("#modalClose").addEventListener("click", () => modal.close());
