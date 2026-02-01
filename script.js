/* ===== Slideshow ===== */
const photos = ["photo1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
let index = 0;
let slideInterval;

function startSlideshow() {
  const slide = document.getElementById("slideshow");
  const img = document.getElementById("slideimg");

  slide.style.display = "block";

  slideInterval = setInterval(() => {
    img.src = photos[index];
    index = (index + 1) % photos.length;
  }, 3000);
}

/* ===== Fireworks ===== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;

  for (let i = 0; i < 50; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 4 + 1,
      radius: 2,
      alpha: 1,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.01;

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}

/* ===== Start Everything ===== */
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startBtn").style.display = "none";

  startSlideshow();
  document.getElementById("message").style.display = "block";

  const music = document.getElementById("music");
  music.play();

  setInterval(createFirework, 800);
  animateFireworks();
});