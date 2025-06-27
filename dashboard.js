AOS.init();

// Image slider logic
const sliderImages = [
  "../assets/navy1.png",
  "../assets/navy2.jpg",
  "../assets/navy3.jpg"
];
let sliderIndex = 0;
const sliderImg = document.getElementById("sliderImage");

setInterval(() => {
  sliderIndex = (sliderIndex + 1) % sliderImages.length;
  sliderImg.classList.remove("opacity-100");
  sliderImg.classList.add("opacity-0");

  setTimeout(() => {
    sliderImg.src = sliderImages[sliderIndex];
    sliderImg.classList.remove("opacity-0");
    sliderImg.classList.add("opacity-100");
  }, 500);
}, 4000);

// Populate user info
document.addEventListener("DOMContentLoaded", async function () {
  const email = localStorage.getItem("user_email");
  const fallbackName = localStorage.getItem("user_name") || "User";
  const fallbackPhone = localStorage.getItem("user_phone") || "Not available";

  if (!email) {
    document.getElementById("welcomeText").textContent = `Welcome, ${fallbackName}!`;
    document.getElementById("fullName").textContent = fallbackName;
    document.getElementById("email").textContent = "Not available";
    document.getElementById("phone").textContent = fallbackPhone;
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("action", "getUser");
    formData.append("email", email);

    const response = await fetch("https://script.google.com/macros/s/AKfycbyELTdQSpDbZek2avOje1bQRHtZcAUX4s64030AJTJfsmtetrBbwr9U02lHiy34zhiL/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById("welcomeText").textContent = `Welcome, ${result.name}!`;
      document.getElementById("fullName").textContent = result.name;
      document.getElementById("email").textContent = result.email;
      document.getElementById("phone").textContent = result.phone;

      // Optionally update localStorage
      localStorage.setItem("user_name", result.name);
      localStorage.setItem("user_phone", result.phone);
    } else {
      document.getElementById("welcomeText").textContent = `Welcome, ${fallbackName}!`;
      document.getElementById("fullName").textContent = fallbackName;
      document.getElementById("email").textContent = email;
      document.getElementById("phone").textContent = fallbackPhone;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    document.getElementById("welcomeText").textContent = `Welcome, ${fallbackName}!`;
    document.getElementById("fullName").textContent = fallbackName;
    document.getElementById("email").textContent = email;
    document.getElementById("phone").textContent = fallbackPhone;
  }
});
// Logout confirmation logic
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const modal = document.getElementById("logoutModal");
  const confirm = document.getElementById("confirmLogout");
  const cancel = document.getElementById("cancelLogout");

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent immediate redirect
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  cancel.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  confirm.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "welcome.html";
  });
});
