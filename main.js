// main.js
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('signatureInput');
  const uploadArea = document.getElementById('uploadArea');
  const previewRow = document.getElementById('previewRow');
  const previewImg = document.getElementById('previewImg');
  const removeBtn = document.getElementById('removeBtn');
  const uploadForm = document.getElementById('uploadForm');

  // file -> preview
  input.addEventListener('change', function (ev) {
    const file = ev.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB.');
      input.value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    previewRow.hidden = false;
    previewImg.onload = () => URL.revokeObjectURL(url);
  });

  // remove
  removeBtn.addEventListener('click', function () {
    input.value = '';
    previewRow.hidden = true;
    previewImg.src = '#';
  });

  // drag over style
  ['dragenter','dragover'].forEach(evt => {
    uploadArea.addEventListener(evt, function (e) {
      e.stopPropagation(); e.preventDefault();
      uploadArea.classList.add('dragover');
    });
  });
  ['dragleave','drop'].forEach(evt => {
    uploadArea.addEventListener(evt, function (e) {
      e.stopPropagation(); e.preventDefault();
      uploadArea.classList.remove('dragover');
    });
  });

  // drop to input
  uploadArea.addEventListener('drop', function (e) {
    const dt = e.dataTransfer;
    if (!dt) return;
    const file = dt.files[0];
    if (!file) return;
    input.files = dt.files; // assign FileList
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    previewRow.hidden = false;
    previewImg.onload = () => URL.revokeObjectURL(url);
  });

  // When form is submitted, wait for server response and scroll to result section automatically
  uploadForm.addEventListener('submit', function () {
    // After POST, server returns updated page; we attempt scroll after a slight delay
    setTimeout(() => {
      const section = document.getElementById('resultSection');
      if (section) section.scrollIntoView({behavior:'smooth', block:'start'});
    }, 400);
  });

  // Auto-scroll to result if server rendered one on page load
  const resultSection = document.getElementById('resultSection');
  if (resultSection && resultSection.dataset.hasResult === 'true') {
    setTimeout(() => resultSection.scrollIntoView({ behavior: 'smooth' }), 250);
  }
});
