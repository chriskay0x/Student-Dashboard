document.addEventListener("DOMContentLoaded", () => {
  // Forgot password validation
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("forgotEmail").value.trim();

      if (email === "") {
        alert("Please enter your email address.");
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("📧 A reset link has been sent to your email (dummy validation).");
      forgotForm.reset();
    });
  }
});
