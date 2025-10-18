document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("announcementForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const posted_by = document.getElementById("posted_by").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !content || !posted_by) {
      message.textContent = "Please fill in all fields!";
      message.style.color = "red";
      return;
    }

    try {
      const res = await fetch("https://studentboard-api.onrender.com/backend/add_announcement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, posted_by, category }),
      });

      const data = await res.json();
      message.textContent = data.message;
      message.style.color = data.status === "success" ? "green" : "red";

      if (data.status === "success") {
        form.reset();
      }
    } catch (err) {
      console.error(err);
      message.textContent = "Server error, please try again.";
      message.style.color = "red";
    }
  });
});
