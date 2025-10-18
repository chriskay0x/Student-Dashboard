// ✅ LOGIN.JS — handles login form logic and connects frontend → backend

// Wait for page to load (recommended if script is deferred)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");

  // Safety check — make sure form exists
  if (!form) {
    console.error("❌ loginForm element not found in HTML!");
    return;
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get user input values
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Simple validation before sending
    if (!email || !password) {
      message.textContent = "Please enter both email and password!";
      message.style.color = "red";
      return;
    }

    try {
      // Send login request to PHP backend
      const res = await fetch("https://studentboard-api.onrender.com/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse the JSON response from backend
      const data = await res.json();
      console.log("Login response:", data);

      // Display message
      message.textContent = data.message;
      message.style.color = data.status === "success" ? "green" : "red";

      // If login successful → save user info and redirect
      if (data.status === "success") {
        // Save user info to localStorage (optional)
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = "index.html"; // change if homepage is elsewhere
        }, 1500);
      }
    } catch (error) {
      console.error("⚠️ Error connecting to backend:", error);
      message.textContent = "Server error — please try again.";
      message.style.color = "red";
    }
  });
});
