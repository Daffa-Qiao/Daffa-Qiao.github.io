const galleryModal = $("#galleryModal");
const galleryPreview = $("#galleryPreview");
$$(".gallery-item").forEach((item) => {
  const clone = item.cloneNode(true);
  $("#galleryTrack").appendChild(clone);
});
$$("#galleryTrack .gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    galleryPreview.textContent = item.dataset.title || item.textContent;
    galleryModal.showModal();
  });
});
$("#galleryClose").addEventListener("click", () => galleryModal.close());
