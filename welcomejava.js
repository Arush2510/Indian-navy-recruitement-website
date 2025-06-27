// Background image slideshow
const images = [
  "../assets/bgimg.jpg",
  "../assets/bgimg2.jpg",
  "../assets/bgimg4.jpg",
  "../assets/bgimg5.jpg"
];

let current = 0;
let isBg1Visible = true;

setInterval(() => {
  const bg1 = document.getElementById("bg1");
  const bg2 = document.getElementById("bg2");

  const nextImage = images[(current + 1) % images.length];
  const newBg = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("${nextImage}")`;

  if (isBg1Visible) {
    bg2.style.backgroundImage = newBg;
    bg2.style.opacity = "1";
    bg1.style.opacity = "0";
  } else {
    bg1.style.backgroundImage = newBg;
    bg1.style.opacity = "1";
    bg2.style.opacity = "0";
  }

  isBg1Visible = !isBg1Visible;
  current = (current + 1) % images.length;
}, 5000);

// Initialize AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
});
