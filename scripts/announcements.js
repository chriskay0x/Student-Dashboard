

document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ announcement.js running");

  const container = document.querySelector(".announcements");
  const searchInput = document.getElementById("searchAnnouncements");
  const categoryFilter = document.getElementById("filterCategory");
  const dateFilter = document.getElementById("filterDate");
  const filterBtn = document.querySelector(".btn");

  if (!container) {
    console.error("❌ .announcements container not found!");
    return;
  }

  let announcements = [];

  // 🔹 Fetch announcements from backend
  async function loadAnnouncements() {
    container.innerHTML = "<p>Loading announcements...</p>";

    try {
      const res = await fetch("https://studentboard-api.onrender.com/backend/get_announcements.php");
      const data = await res.json();
      console.log("Fetched data:", data);

      if (data.status === "success" && data.data.length > 0) {
        announcements = data.data;
        displayAnnouncements(announcements);
      } else {
        container.innerHTML = "<p>No announcements found.</p>";
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      container.innerHTML = "<p>Failed to load announcements.</p>";
    }
  }

  // 🔹 Display announcements on page
  function displayAnnouncements(list) {
    if (!list || list.length === 0) {
      container.innerHTML = "<p>No announcements to display.</p>";
      return;
    }

    const html = list
      .map(
        (a) => `
        <div class="announcement animate">
          <h3>${a.title}</h3>
          <p>${a.content}</p>
          <small>Posted by ${a.posted_by} on ${new Date(a.created_at).toLocaleString()}</small>
        </div>
      `
      )
      .join("");

    container.innerHTML = html;
  }

  // 🔹 Filter announcements (by search, category, or date)
  function applyFilters() {
    if (announcements.length === 0) return;

    const searchTerm = searchInput?.value.toLowerCase() || "";
    const selectedCategory = categoryFilter?.value || "";
    const selectedDate = dateFilter?.value || "";

    const filtered = announcements.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchTerm) ||
        a.content.toLowerCase().includes(searchTerm);
      const matchesCategory =
        !selectedCategory ||
        (a.category && a.category === selectedCategory);
      const matchesDate =
        !selectedDate || a.created_at.startsWith(selectedDate);
      return matchesSearch && matchesCategory && matchesDate;
    });

    displayAnnouncements(filtered);
  }

  // 🔹 Event listeners
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (filterBtn) filterBtn.addEventListener("click", applyFilters);

  // 🔹 Initial load
  await loadAnnouncements();
});
