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








// TABS
const adminTab = document.getElementById("adminTab");
const studentTab = document.getElementById("studentTab");
const admin = document.getElementById("admin");
const student = document.getElementById("student");

adminTab.onclick = () => {
  admin.classList.add("active");
  student.classList.remove("active");
  adminTab.classList.add("active");
  studentTab.classList.remove("active");
};

studentTab.onclick = () => {
  student.classList.add("active");
  admin.classList.remove("active");
  studentTab.classList.add("active");
  adminTab.classList.remove("active");
};

// SAVE RESULT
document.getElementById("saveBtn").onclick = () => {
  // get element values
  const r = document.getElementById("roll").value;
  const d = document.getElementById("dob").value;
  const n = document.getElementById("name").value;
  const t = document.getElementById("total").value;
  const s = document.getElementById("status").value;

  // save in localStorage
  let results = JSON.parse(localStorage.getItem("results")) || [];

  results.push({
    roll: r,
    dob: d,
    name: n,
    total: t,
    status: s
  });

  localStorage.setItem("results", JSON.stringify(results));

  document.getElementById("msg").innerText = "✅ Result Saved Successfully";

  // clear input
  document.getElementById("roll").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("name").value = "";
  document.getElementById("total").value = "";
};

// CHECK RESULT
document.getElementById("checkBtn").onclick = () => {
  const sr = document.getElementById("sroll").value;
  const sd = document.getElementById("sdob").value;

  let results = JSON.parse(localStorage.getItem("results")) || [];

  let found = results.find(r => r.roll === sr && r.dob === sd);

  if(found){
    result.innerHTML = `
      <div class="result-card">
        <h2>${found.name}</h2>
        <table>
          <tr>
            <th>Status</th>
            <td class="${found.status === 'Pass' ? 'status-pass' : 'status-fail'}">${found.status}</td>
          </tr>
          <tr>
            <th>Roll No</th>
            <td>${found.roll}</td>
          </tr>
          <tr>
            <th>Total Marks</th>
            <td>${found.total}</td>
          </tr>
        </table>
      </div>
    `;
  } else {
    result.innerHTML = "<p style='color:red; font-weight:bold;'>❌ Result Not Found</p>";
  }
};
