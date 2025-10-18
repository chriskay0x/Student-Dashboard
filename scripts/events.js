document.addEventListener("DOMContentLoaded", async () => {
  const eventsContainer = document.querySelector(".events");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  // 🔹 Load events immediately
  await loadEvents();

  // 🔹 If admin, show upload form
  if (isAdmin) {
    const uploadSection = document.createElement("section");
    uploadSection.className = "upload-event admin-only";
    uploadSection.innerHTML = `
      <h3>Add New Event</h3>
      <form id="eventForm">
        <input type="text" id="title" placeholder="Event Title" required />
        <input type="date" id="event_date" required />
        <input type="text" id="location" placeholder="Location" required />
        <textarea id="description" placeholder="Event Description" required></textarea>
        <select id="category" required>
          <option value="">Select Category</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="hackathon">Hackathon</option>
          <option value="meeting">Meeting</option>
        </select>
        <button type="submit" class="btn">Upload Event</button>
      </form>
      <hr/>
    `;
    document.querySelector(".page-container").prepend(uploadSection);

    // Upload event
    document.getElementById("eventForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const newEvent = {
        title: document.getElementById("title").value.trim(),
        event_date: document.getElementById("event_date").value,
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim(),
        category: document.getElementById("category").value,
      };

      const res = await fetch("http://localhost/studentboard/backend/add_event.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const data = await res.json();
      alert(data.message);

      if (data.status === "success") {
        e.target.reset();
        loadEvents(); // reload after upload
      }
    });
  }

  // 🔹 Function to load and display events
  async function loadEvents() {
    try {
      const res = await fetch("http://localhost/studentboard/backend/get_events.php");
      const data = await res.json();
      console.log("Events data:", data);

      if (data.status === "success" && data.data.length > 0) {
        renderEvents(data.data);
      } else {
        eventsContainer.innerHTML = `<p style="text-align:center;">No events found.</p>`;
      }
    } catch (err) {
      console.error("Error loading events:", err);
      eventsContainer.innerHTML = `<p style="text-align:center;">Failed to load events.</p>`;
    }
  }

  // 🔹 Function to render events
  function renderEvents(events) {
    eventsContainer.innerHTML = events
      .map(
        (ev) => `
          <div class="event-card">
            <h3>${ev.title}</h3>
            <p><strong>Date:</strong> ${ev.event_date}</p>
            <p><strong>Location:</strong> ${ev.location}</p>
            <p>${ev.description}</p>
            <p><em>Category:</em> ${ev.category || "General"}</p>
            <small><em>Posted by ${ev.created_by}</em></small>
          </div>
        `
      )
      .join("");
    console.log("Rendered", events.length, "events");
  }
});
