document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const scriptURL = "https://script.google.com/macros/s/AKfycbyELTdQSpDbZek2avOje1bQRHtZcAUX4s64030AJTJfsmtetrBbwr9U02lHiy34zhiL/exec";

    const formData = new URLSearchParams();
    formData.append("action", "register"); // 👈 REQUIRED to route to the registration block in doPost
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const raw = await response.text(); // To safely log raw text before parsing
      console.log("Raw response:", raw);
      const result = JSON.parse(raw);

      if (result.success) {
        alert("Registered successfully! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Registration failed", err);
      alert("An error occurred. Please try again.");
    }
  });
});
