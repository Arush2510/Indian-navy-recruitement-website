document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    const formData = new URLSearchParams();
    formData.append("action", "login");
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyELTdQSpDbZek2avOje1bQRHtZcAUX4s64030AJTJfsmtetrBbwr9U02lHiy34zhiL/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        // Store email for dashboard to fetch details
        localStorage.setItem("user_email", email);

        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to your secured page
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Something went wrong. Try again.");
    }
  });
});
