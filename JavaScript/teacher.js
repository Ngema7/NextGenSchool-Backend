
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









let teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
let editIndex = null;

const modal = document.getElementById("teacherFormModal");
const openFormBtn = document.getElementById("openFormBtn");
const closeButton = document.querySelector(".close");
const teacherForm = document.getElementById("teacherForm");
const teacherContainer = document.getElementById("teacherContainer");
const formTitle = document.getElementById("formTitle");

// Render teachers initially
renderTeachers();

// Open Add Teacher modal
openFormBtn.onclick = () => {
  formTitle.textContent = "Add Teacher";
  modal.style.display = "flex";
  teacherForm.reset();
  editIndex = null;  // IMPORTANT: reset so new teachers can be added
  document.getElementById("image").value = "";
}

// Close modal
closeButton.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }

// Render teacher cards
function renderTeachers() {
  teacherContainer.innerHTML = "";
  teachers.forEach((t, index) => {
    const card = document.createElement("div");
    card.className = "teacher-card-item";
    card.innerHTML = `
      <img src="${t.image}" alt="Teacher"/>
      <h4>${t.name}</h4>
      <p>${t.email}</p>
      <p>${t.position}</p>
      <div class="card-actions">
        <button class="edit-btn" onclick="editTeacher(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTeacher(${index})">Delete</button>
      </div>
    `;
    teacherContainer.appendChild(card);
  });
}

// Add or Edit Teacher
teacherForm.onsubmit = e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const position = document.getElementById("position").value.trim();
  const imageInput = document.getElementById("image");

  const saveTeacher = (imgSrc) => {
    const teacherData = { name, email, position, image: imgSrc };
    if(editIndex !== null){
      teachers[editIndex] = teacherData;
    } else {
      teachers.push(teacherData);
    }
    localStorage.setItem("teachers", JSON.stringify(teachers));
    renderTeachers();
    modal.style.display = "none";
  }

  if(imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => saveTeacher(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveTeacher("https://via.placeholder.com/80");
  }
}

// Edit Teacher
function editTeacher(index){
  const t = teachers[index];
  document.getElementById("name").value = t.name;
  document.getElementById("email").value = t.email;
  document.getElementById("position").value = t.position;
  formTitle.textContent = "Edit Teacher";
  modal.style.display = "flex";
  editIndex = index;
  document.getElementById("image").value = "";
}

// Delete Teacher
function deleteTeacher(index){
  if(confirm("Are you sure you want to delete this teacher?")){
    teachers.splice(index,1);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    renderTeachers();
  }
}
