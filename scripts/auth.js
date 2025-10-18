document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const message = document.getElementById("signupMessage");

  // Validate on frontend
  if (!name || !email || !password) {
    message.textContent = "All fields are required!";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch("https://studentboard-api.onrender.com/backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    message.textContent = data.message;
    message.style.color = data.status === "success" ? "green" : "red";

    // Redirect on success
    if (data.status === "success") {
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Error:", error);
    message.textContent = "Something went wrong. Please try again.";
    message.style.color = "red";
  }
});
