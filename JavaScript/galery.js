const toggleBtn = document.getElementById("toggleBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");

// Open sidebar
toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

// Close sidebar
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});






const imageInput = document.getElementById("imageInput");
const gallery = document.getElementById("gallery");

// Load saved images
window.onload = () => {
  const images = JSON.parse(localStorage.getItem("galleryImages")) || [];
  images.forEach((img, index) => addImage(img, index));
};

// Upload image
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const images = JSON.parse(localStorage.getItem("galleryImages")) || [];
    images.push(reader.result);
    localStorage.setItem("galleryImages", JSON.stringify(images));
    addImage(reader.result, images.length - 1);
  };
  reader.readAsDataURL(file);
});

// Add image card
function addImage(src, index) {
  const item = document.createElement("div");
  item.className = "gallery-item";

  const img = document.createElement("img");
  img.src = src;

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.innerHTML = "✕";

  delBtn.onclick = () => deleteImage(index);

  item.appendChild(img);
  item.appendChild(delBtn);
  gallery.appendChild(item);
}

// Delete image
function deleteImage(index) {
  let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
  images.splice(index, 1);
  localStorage.setItem("galleryImages", JSON.stringify(images));
  gallery.innerHTML = "";
  images.forEach((img, i) => addImage(img, i));
}
