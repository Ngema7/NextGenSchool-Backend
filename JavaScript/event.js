// Sidebar
const toggleBtn = document.getElementById("toggleBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
toggleBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeBtn.addEventListener("click", () => sidebar.classList.remove("active"));



// sabai lai define gare ko 
const BASE_URL = "http://localhost:5000"; 

//marquee 



window.addMarquee = async function () {
  const input = document.getElementById("marqueeInput");
  const msgDiv = document.getElementById("marqueeMessage"); 
  if (!input.value.trim()) return;

  try {
    const res = await fetch(`${BASE_URL}/api/marquee`, {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input.value }),
    });
    const data = await res.json();

    if (!res.ok) {
      if (msgDiv) {
        msgDiv.style.color = "red";
        msgDiv.textContent = data.message || "Failed to add marquee";
      }
      return;
    }

    if (msgDiv) {
      msgDiv.style.color = "green";
      msgDiv.textContent = `Marquee added: "${data.text}"`;
    }

    input.value = "";
    loadMarquee();
  } catch (err) {
    if (msgDiv) {
      msgDiv.style.color = "red";
      msgDiv.textContent = "Network error!";
    }
    console.error(err);
  }
};

window.loadMarquee = async function () {
  try {
    const res = await fetch(`${BASE_URL}/api/marquee`);  
    const data = await res.json();
    document.getElementById("marqueeDisplay").innerHTML = data
      .map((d) => d.text)
      .join(" &nbsp; ✦ &nbsp; ");

    const ul = document.getElementById("marqueeList");
    ul.innerHTML = "";
    data.forEach((d) => {
      ul.innerHTML += `<li>
        <span>${d.text}</span>
        <button onclick="deleteMarquee('${d._id}')">Delete</button>
      </li>`;
    });
  } catch (err) {
    console.error("Failed to load marquee:", err);
  }
};

window.deleteMarquee = async function (id) {
  try {
    const res = await fetch(`${BASE_URL}/api/marquee/${id}`, { method: "DELETE" });  
    const data = await res.json();
    alert(data.message);
    loadMarquee();
  } catch (err) {
    alert("Failed to delete marquee");
    console.error(err);
  }
};




//newsss 



window.addNews = async function () {
  const title = document.getElementById("newsInput").value;
  const date = document.getElementById("newsDate").value;
  const msgDiv = document.getElementById("newsMessage");

  if (!title || !date) {
    if (msgDiv) {
      msgDiv.style.color = "red";
      msgDiv.textContent = "Please fill all fields!";
    }
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date: new Date(date) }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (msgDiv) {
        msgDiv.style.color = "red";
        msgDiv.textContent = data.message || "Failed to add news";
      }
      return;
    }

    if (msgDiv) {
      msgDiv.style.color = "green";
      msgDiv.textContent = `News added: "${data.title}"`;
    }

    document.getElementById("newsInput").value = "";
    document.getElementById("newsDate").value = "";
    loadNews();
  } catch (err) {
    if (msgDiv) {
      msgDiv.style.color = "red";
      msgDiv.textContent = "Network error!";
    }
    console.error(err);
  }
};

window.loadNews = async function () {
  try {
    const res = await fetch(`${BASE_URL}/api/news`);
    const data = await res.json();
    const ul = document.getElementById("newsList");
    ul.innerHTML = "";
    data.forEach((n) => {
      const formattedDate = new Date(n.date).toLocaleDateString();
      ul.innerHTML += `<li>
        <div><strong>${n.title}</strong><br><small>📅 ${formattedDate}</small></div>
        <button class="delete" onclick="deleteNews('${n._id}')">Delete</button>
      </li>`;
    });
  } catch (err) {
    console.error("Failed to load news:", err);
  }
};

window.deleteNews = async function (id) {
  try {
    const res = await fetch(`${BASE_URL}/api/news/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message);
    loadNews();
  } catch (err) {
    alert("Failed to delete news");
    console.error(err);
  }
};




// ===== EVENTS =====


window.addEvent = async function () {
  const title = document.getElementById("eventInput").value;
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;
  const msgDiv = document.getElementById("eventMessage");

  if (!title || !date || !time) {
    msgDiv.style.color = "red";
    msgDiv.textContent = "Please fill all fields!";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/events`, {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, time }),
    });

    const data = await res.json();

    if (!res.ok) {
      msgDiv.style.color = "red";
      msgDiv.textContent = data.message || "Failed to add event!";
      return;
    }

    msgDiv.style.color = "green";
    msgDiv.textContent = `Event "${data.title}" saved successfully!`;

    document.getElementById("eventInput").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";

    loadEvents();
  } catch (err) {
    msgDiv.style.color = "red";
    msgDiv.textContent = "Network error! Could not add event.";
    console.error(err);
  }
};

window.loadEvents = async function () {
  try {
    const res = await fetch(`${BASE_URL}/api/events`);   
    const data = await res.json();
    const ul = document.getElementById("eventList");
    ul.innerHTML = "";

    data.forEach((e) => {
      const formattedDate = new Date(e.date).toLocaleDateString();
      ul.innerHTML += `<li>
          <div>
            <strong>${e.title}</strong><br>
            <small>📅 ${formattedDate} ⏰ ${e.time}</small>
          </div>
          <button class="delete" onclick="deleteEvent('${e._id}')">Delete</button>
        </li>`;
    });
  } catch (err) {
    console.error("Failed to load events:", err);
  }
};

window.deleteEvent = async function (id) {
  try {
    const res = await fetch(`${BASE_URL}/api/events/${id}`, {   
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    loadEvents();
  } catch (err) {
    alert("Failed to delete event");
    console.error(err);
  }
};




// Initialize
window.addEventListener("DOMContentLoaded", () => {
  loadMarquee();
  loadNews();
  loadEvents();
});
