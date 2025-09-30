// Update year
document.getElementById("year").textContent = new Date().getFullYear();

// Default poem templates
const templates = {
  haiku: {
    calm: [
      "Soft winds in the trees\nWhispers drift across the sky\nPeace within the soul",
      "Moonlight on still waves\nSilent night embraces all\nCalm hearts drift to rest"
    ],
    joy: [
      "Laughter fills the air\nPetals dance in morning sun\nLife bursts into song",
      "Bright skies overhead\nChildren running, voices free\nJoy blooms everywhere"
    ],
    melancholy: [
      "Leaves fall silently\nEchoes of forgotten days\nLoneliness lingers",
      "A cold autumn breeze\nCarries whispers of the past\nShadows stay behind"
    ],
    mystery: [
      "Fog wraps around streets\nSecrets hide in whispered tones\nNight keeps what it knows",
      "Stars conceal their truths\nSilent watchers from afar\nMystery remains"
    ]
  },
  free: {
    calm: [
      "In the quiet of morning,\nmy breath follows the rhythm\nof the earth’s soft hum.",
      "A still pond reflects the world—\nevery ripple a memory,\nevery silence a song."
    ],
    joy: [
      "Sunlight spills across my face,\nlike a thousand golden promises\nwaiting to be kept.",
      "Every heartbeat\nis a drum of celebration,\na dance I cannot resist."
    ],
    melancholy: [
      "The window remembers\nall the storms I’ve watched alone,\nand it does not judge.",
      "I hold conversations with silence;\nit always knows\nwhat I cannot say."
    ],
    mystery: [
      "A door half-open\ninvites a thousand stories\nnone of them mine.",
      "Shadows spill secrets\nthat even the moon refuses\nto speak aloud."
    ]
  },
  couplet: {
    calm: [
      "The river flows with gentle grace,\nA quiet smile on nature’s face.",
      "Soft breezes drift, the meadows sway,\nThey carry peace along the way."
    ],
    joy: [
      "A spark of laughter lights the skies,\nThe world awakes with bright surprise.",
      "The blossoms bloom, the songbirds sing,\nJoy bursts anew in endless spring."
    ],
    melancholy: [
      "A lonely star begins to weep,\nIt guards the night while others sleep.",
      "The fading light, a solemn sigh,\nAs whispered dreams prepare to die."
    ],
    mystery: [
      "Beneath the veil of fog’s embrace,\nThe night conceals its hidden face.",
      "The forest hums with secret lore,\nEach shadow whispers something more."
    ]
  }
};

// Elements
const styleSelect = document.getElementById("styleSelect");
const moodSelect = document.getElementById("moodSelect");
const output = document.getElementById("generated");

// Generate poem
function generatePoem() {
  const style = styleSelect.value;
  const mood = moodSelect.value;
  const options = templates[style][mood];
  const poem = options[Math.floor(Math.random() * options.length)];
  output.textContent = poem;
  launchConfetti();
}

// Copy poem
document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent);
  alert("Poem copied to clipboard!");
});

// Speak poem
document.getElementById("speakBtn").addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(output.textContent);
  speechSynthesis.speak(utterance);
});

// Remix (randomize style & mood, then generate)
document.getElementById("remixBtn").addEventListener("click", () => {
  const styles = Object.keys(templates);
  const moods = Object.keys(templates["haiku"]);
  styleSelect.value = styles[Math.floor(Math.random() * styles.length)];
  moodSelect.value = moods[Math.floor(Math.random() * moods.length)];
  generatePoem();
});

// Generate button
document.getElementById("genBtn").addEventListener("click", generatePoem);

// Keyboard shortcut (G)
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") generatePoem();
});

// Confetti
function launchConfetti() {
  const duration = 1200;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, spread: 60, origin: { y: 0.7 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
