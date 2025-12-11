// BASE
const BASE_URL = "http://localhost:8080/students";

// initialize
window.addEventListener("DOMContentLoaded", () => {
  bindUpdateForm();
  fetchStudents();
});

// Add student
function addStudent(){
  const student = {
    rollno: Number(document.getElementById("rollno").value),
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    age: document.getElementById("age").value ? Number(document.getElementById("age").value) : null,
    branch: document.getElementById("branch").value.trim(),
    college: document.getElementById("college").value.trim()
  };

  fetch(BASE_URL, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(student)
  })
  .then(res => {
    if(!res.ok) throw new Error("Failed to add");
    return res.json();
  })
  .then(_ => {
    document.getElementById("addForm").reset();
    fetchStudents();
  })
  .catch(err => alert(err.message));
}

// Fetch and render
function fetchStudents(){
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      renderTable(data);
      document.getElementById("studentCount").textContent = data.length;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("studentCount").textContent = "0";
    });
}

// Render table rows
function renderTable(students){
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  students.forEach(s => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${s.id ?? ""}</td>
      <td>${escapeHtml(s.rollno?.toString() ?? "")}</td>
      <td>${escapeHtml(s.name ?? "")}</td>
      <td>${escapeHtml(s.email ?? "")}</td>
      <td>${s.age ?? ""}</td>
      <td>${escapeHtml(s.branch ?? "")}</td>
      <td>${escapeHtml(s.college ?? "")}</td>
      <td>
        <button class="action-btn edit-btn" onclick="openUpdateModal(${s.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Delete
function deleteStudent(id){
  if(!confirm("Confirm delete?")) return;
  fetch(`${BASE_URL}/${id}`, { method:"DELETE" })
    .then(res => {
      if(!res.ok) throw new Error("Delete failed");
      fetchStudents();
    })
    .catch(err => alert(err.message));
}

/* ---------- Update Modal logic ---------- */

function openUpdateModal(id){
  // get single student's data by fetching list (lightweight)
  fetch(BASE_URL)
    .then(res => res.json())
    .then(list => {
      const student = list.find(x => x.id === id);
      if(!student) throw new Error("Not found");

      // fill
      document.getElementById("updateId").value = student.id;
      document.getElementById("updateRollno").value = student.rollno ?? "";
      document.getElementById("updateName").value = student.name ?? "";
      document.getElementById("updateEmail").value = student.email ?? "";
      document.getElementById("updateAge").value = student.age ?? "";
      document.getElementById("updateBranch").value = student.branch ?? "";
      document.getElementById("updateCollege").value = student.college ?? "";

      // show modal
      const modal = document.getElementById("updateModal");
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden","false");
    })
    .catch(err => alert(err.message));
}

function closeModal(){
  const modal = document.getElementById("updateModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden","true");
}

function bindUpdateForm(){
  const form = document.getElementById("updateForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("updateId").value;
    const updated = {
      rollno: Number(document.getElementById("updateRollno").value),
      name: document.getElementById("updateName").value.trim(),
      email: document.getElementById("updateEmail").value.trim(),
      age: document.getElementById("updateAge").value ? Number(document.getElementById("updateAge").value) : null,
      branch: document.getElementById("updateBranch").value.trim(),
      college: document.getElementById("updateCollege").value.trim()
    };

    fetch(`${BASE_URL}/${id}`, {
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(updated)
    })
    .then(res => {
      if(!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then(_ => {
      closeModal();
      fetchStudents();
    })
    .catch(err => alert(err.message));
  });

  // close modal when clicking outside
  window.addEventListener("click", (ev) => {
    const modal = document.getElementById("updateModal");
    if(ev.target === modal) closeModal();
  });
}

// small XSS helper
function escapeHtml(text){
  if(!text) return "";
  return text.toString()
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
