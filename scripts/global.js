
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login-btn");
  const logoutBtn = document.querySelector(".logout-btn");

  // Check user login state
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // User is logged in
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    // User is not logged in
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // Handle logout
  if (logoutBtn) {
      logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
          const res = await fetch("http://localhost/studentboard/backend/logout.php");
          const data = await res.json();
          console.log(data.message);
        } catch (err) {
          console.error("Logout error:", err);
        }

        localStorage.removeItem("user");
        alert("You have logged out successfully.");
        window.location.href = "index.html";
    });
  }
});
