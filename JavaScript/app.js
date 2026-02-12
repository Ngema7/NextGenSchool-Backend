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






