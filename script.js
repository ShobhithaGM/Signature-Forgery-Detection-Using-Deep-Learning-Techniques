const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const dropArea = document.getElementById("dropArea");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("previewImg");
const removeBtn = document.getElementById("removeBtn");

// Open file dialog on button click
browseBtn.addEventListener("click", () => fileInput.click());

// Show preview on file selection
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) showPreview(file);
});

// Drag & drop
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#2563eb";
});
dropArea.addEventListener("dragleave", () => {
  dropArea.style.borderColor = "#d1d5db";
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#d1d5db";
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    showPreview(file);
  }
});

// Preview function
function showPreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    preview.hidden = false;
  };
  reader.readAsDataURL(file);
}

// Remove file
removeBtn.addEventListener("click", () => {
  fileInput.value = "";
  preview.hidden = true;
  previewImg.src = "#";
});
