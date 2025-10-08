/* ========== YEAR ========== */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========== THEME TOGGLE ========== */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") body.classList.add("light");
themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
});

/* ========== NAV MENU ========== */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn?.addEventListener("click", () => navLinks.classList.toggle("show"));

/* ========== SCROLL TO TOP ========== */
document.getElementById("topBtn")?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ========== TYPEWRITER ========== */
const typeEl = document.getElementById("typewriter");
if (typeEl) {
  const text = "✨ Welcome to StanzaSphere ✨";
  let i = 0;
  (function typeWriter() {
    if (i < text.length) {
      typeEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 70);
    }
  })();
}

/* ========== FADE-IN ON SCROLL ========== */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add("show");
  });
});

/* ========== PARTICLE BACKGROUND ========== */
const canvas = document.getElementById("orbital");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(139,92,246,0.8)";
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
}

/* ========== CONFETTI (requires CDN) ========== */
function launchConfetti() {
  if (typeof confetti === "undefined") return;
  const duration = 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, spread: 60, origin: { y: 0.7 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ========== SOUND EFFECT ========== */
function playChime() {
  const sound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7a9a4e0b0f.mp3?filename=correct-2-46134.mp3");
  sound.volume = 0.3;
  sound.play();
}

/* ========== POEM GENERATOR ========== */
const styleSelect = document.getElementById("styleSelect");
const moodSelect = document.getElementById("moodSelect");
const output = document.getElementById("generated");

if (output) {
  const templates = {
    haiku: {
      calm: ["Soft winds in trees\nWhispers drift across the sky\nPeace within the soul"],
      joy: ["Laughter fills the air\nPetals dance in morning sun\nLife bursts into song"],
      melancholy: ["Leaves fall silently\nEchoes of forgotten days\nLoneliness lingers"],
      mystery: ["Fog wraps around streets\nSecrets hide in whispered tones\nNight keeps what it knows"],
    },
    free: {
      calm: ["In the quiet of morning,\nmy breath follows\nthe earth’s soft hum."],
      joy: ["Sunlight spills across my face,\nlike a thousand golden promises."],
      melancholy: ["The window remembers\nstorms I’ve watched alone."],
      mystery: ["A door half-open\ninvites a thousand stories."],
    },
    couplet: {
      calm: ["The river flows with gentle grace,\nA quiet smile on nature’s face."],
      joy: ["A spark of laughter lights the skies,\nThe world awakes with bright surprise."],
      melancholy: ["A lonely star begins to weep,\nIt guards the night while others sleep."],
      mystery: ["Beneath the veil of fog’s embrace,\nThe night conceals its hidden face."],
    },
  };

  async function revealPoem(poem) {
    output.textContent = "";
    for (const line of poem.split("\n")) {
      output.textContent += line + "\n";
      await new Promise((r) => setTimeout(r, 180));
    }
  }

  function generatePoem() {
    const style = styleSelect.value;
    const mood = moodSelect.value;
    const poem = templates[style][mood][Math.floor(Math.random() * templates[style][mood].length)];
    revealPoem(poem);
    playChime();
    launchConfetti();
  }

  document.getElementById("genBtn")?.addEventListener("click", generatePoem);
  document.getElementById("remixBtn")?.addEventListener("click", () => {
    const styles = Object.keys(templates);
    const moods = Object.keys(templates.haiku);
    styleSelect.value = styles[Math.floor(Math.random() * styles.length)];
    moodSelect.value = moods[Math.floor(Math.random() * moods.length)];
    generatePoem();
  });
  document.getElementById("copyBtn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(output.textContent);
    alert("📋 Poem copied!");
  });
  document.getElementById("speakBtn")?.addEventListener("click", () => {
    const utter = new SpeechSynthesisUtterance(output.textContent);
    utter.rate = 0.9;
    utter.pitch = 1.1;
    speechSynthesis.speak(utter);
  });
}


