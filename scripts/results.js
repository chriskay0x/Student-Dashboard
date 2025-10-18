document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("resultsContainer");

  try {
    const res = await fetch("https://studentboard-api.onrender.com/backend/get_results.php");
    const data = await res.json();
    console.log("Results data:", data);

    if (data.status === "error") {
      container.innerHTML = `<p>${data.message}</p>`;
      setTimeout(() => (window.location.href = "login.html"), 1500);
    } else if (data.status === "empty") {
      container.innerHTML = `<p>No results found for your account.</p>`;
    } else if (data.status === "success") {
      renderTable(data.data);
    }
  } catch (err) {
    console.error("Error fetching results:", err);
    container.innerHTML = "<p>Failed to load results.</p>";
  }

  function renderTable(results) {
    const tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Semester</th>
            <th>Session</th>
          </tr>
        </thead>
        <tbody>
          ${results
            .map(
              (r) => `
            <tr>
              <td>${r.course_code}</td>
              <td>${r.course_title}</td>
              <td>${r.score}</td>
              <td>${r.grade}</td>
              <td>${r.semester}</td>
              <td>${r.session_year}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
    container.innerHTML = tableHTML;
  }
});
