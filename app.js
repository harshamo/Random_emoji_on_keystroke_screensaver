const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const hint = document.getElementById('hint');
const keyDisplay = document.getElementById('key-display');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ─── Key → Emoji Map ────────────────────────────────────────────────────────
const keyMap = {
  a: ['🐊','🦏','🐜','🍎','✈️','🎨','⚓'],
  b: ['🐝','🦋','🎸','🏀','💣','🍌','🐻'],
  c: ['🐱','🎂','☁️','🧁','🐊','🌈','💎'],
  d: ['🐉','💎','🥁','🦌','🌊','🐬','🎲'],
  e: ['🦅','🥚','🌍','⚡','🐘','🎭','👁️'],
  f: ['🔥','🦊','🌸','🐸','🎆','🍟','⚽'],
  g: ['👻','🦍','🌿','🎸','🍇','🦒','✨'],
  h: ['❤️','🏠','🎃','🌿','🦔','🐴','🪄'],
  i: ['🧊','💡','🌺','🎠','🦋','📚','🌈'],
  j: ['🪼','🎷','⚡','🌴','🦊','🚀','🃏'],
  k: ['🥝','🦘','🔑','🌸','👑','🎯','🐨'],
  l: ['🦁','⚡','🌙','🍋','🌺','💫','🦜'],
  m: ['🌙','🎵','🦋','🍄','🔮','🌊','🎭'],
  n: ['🌙','💫','🍜','🎵','🌀','🦩','🔮'],
  o: ['🐙','🍊','🌊','💿','🔮','🌎','🐬'],
  p: ['🐼','🎆','🌸','🍕','🦚','🔮','🪄'],
  q: ['👑','🎵','🌟','🦅','🍇','💫','🌈'],
  r: ['🌈','🚀','🤖','🦅','🍓','🔴','🎸'],
  s: ['⭐','🐍','🌊','☀️','🎸','🦋','🚀'],
  t: ['🌊','🐯','🦋','🌴','🎭','⚡','🔥'],
  u: ['🦄','☂️','🌌','⬆️','🪁','🌀','💫'],
  v: ['🎻','🌋','💜','🦅','✌️','🍇','⚡'],
  w: ['🌊','🐺','🦋','☁️','🌀','✨','🔮'],
  x: ['❌','⚡','🎆','💥','🦴','✨','🌌'],
  y: ['⚡','🌟','🎋','🦁','💛','🧶','🌈'],
  z: ['⚡','💤','🦓','🌀','💫','🎵','🌈'],
  '0': ['🌑','💿','⭕','🕳️','🪩','🔘','◯'],
  '1': ['☝️','🥇','🪄','⚡','🌟','💯','🏆'],
  '2': ['✌️','🦆','💑','🎶','🌊','🪬','💕'],
  '3': ['🔱','🌈','🎲','🍀','🔺','🌸','💎'],
  '4': ['🍀','💎','🔷','🎯','⚡','🌟','🎸'],
  '5': ['⭐','🌟','🎲','🖐️','💫','🌠','🎭'],
  '6': ['🎲','🌀','🔮','💫','🎶','🌊','✨'],
  '7': ['🍀','⚡','🎯','🌟','💫','🎸','🌈'],
  '8': ['🎱','♾️','🕸️','⛎','🌀','💫','🎭'],
  '9': ['🎆','🔮','💫','🌌','⭐','🎇','✨'],
  ' ':         ['💥','🌌','⭐','✨','🌟','💫','🎆'],
  'Enter':     ['✅','🚀','💫','⚡','🌟','🎆','💥'],
  'Escape':    ['🌀','💨','🌫️','❄️','🌬️','💤','😴'],
  'Backspace': ['💢','❌','🔙','↩️','🗑️','💥','⚡'],
  'Tab':       ['↔️','🔀','🌀','💫','🎵','🎶','🎸'],
  'ArrowUp':   ['⬆️','🚀','🌟','💫','⭐','🦅','🌠'],
  'ArrowDown': ['⬇️','💧','🍂','🌊','🌧️','💦','🐋'],
  'ArrowLeft': ['⬅️','🌈','🎵','🎶','💫','🌙','🦀'],
  'ArrowRight':['➡️','🚀','⚡','🌟','🦅','💨','🎯'],
};

const defaultEmojis = ['✨','💫','⭐','🌟','💥','🔥','❄️','🌈','⚡','🌀'];

function getEmoji(key) {
  const k = key.toLowerCase();
  const pool = keyMap[k] || keyMap[key] || defaultEmojis;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Generate a consistent hue from a key character
function keyColor(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h += key.charCodeAt(i) * 37;
  return `hsl(${h % 360}, 90%, 65%)`;
}

// ─── Particle System ─────────────────────────────────────────────────────────
const floaters = [];

function spawnFloater(emoji, x, y, color) {
  floaters.push({
    emoji, x, y, color,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    size: Math.random() * 40 + 20,
    life: 1,
    decay: 0.004 + Math.random() * 0.006,
    spin: (Math.random() - 0.5) * 0.1,
    angle: Math.random() * Math.PI * 2,
  });
}

function spawnBurst(emoji, x, y, color) {
  // Radial burst
  const count = 14;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    floaters.push({
      emoji, x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 35 + 18,
      life: 1,
      decay: 0.01 + Math.random() * 0.01,
      spin: (Math.random() - 0.5) * 0.15,
      angle: Math.random() * Math.PI * 2,
    });
  }
  // Random scatter
  for (let i = 0; i < 8; i++) {
    floaters.push({
      emoji, x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 3,
      size: Math.random() * 25 + 10,
      life: 1,
      decay: 0.015 + Math.random() * 0.015,
      spin: (Math.random() - 0.5) * 0.2,
      angle: Math.random() * Math.PI * 2,
    });
  }
}

function spawnRipple(x, y, color) {
  const el = document.createElement('div');
  el.className = 'ripple';
  const size = Math.min(window.innerWidth, window.innerHeight) * 1.5;
  el.style.cssText = `
    left: ${x}px; top: ${y}px;
    width: ${size}px; height: ${size}px;
    border: 3px solid ${color};
    --dur: 0.9s;
    box-shadow: 0 0 30px ${color}44;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ─── Render Loop ─────────────────────────────────────────────────────────────
let lastTime = 0;

function animate(t) {
  const dt = Math.min((t - lastTime) / 16, 3);
  lastTime = t;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    f.vy += 0.04 * dt; // gentle gravity
    f.angle += f.spin * dt;
    f.life -= f.decay * dt;

    if (f.life <= 0) { floaters.splice(i, 1); continue; }

    ctx.save();
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.translate(f.x, f.y);
    ctx.rotate(f.angle);
    ctx.font = `${f.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = f.color;
    ctx.shadowBlur = 20 * f.life;
    ctx.fillText(f.emoji, 0, 0);
    ctx.restore();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// ─── Key Handler ─────────────────────────────────────────────────────────────
let hintHidden = false;
let lastKey = null;
let comboCount = 0;
let lastKeyTime = 0;

function flashCenter(emoji) {
  keyDisplay.textContent = emoji;
  keyDisplay.classList.remove('flash');
  void keyDisplay.offsetWidth; // force reflow to restart animation
  keyDisplay.classList.add('flash');
}

window.addEventListener('keydown', (e) => {
  if (e.repeat) return;

  if (!hintHidden) {
    hint.classList.add('hidden');
    hintHidden = true;
  }

  const key = e.key;
  const emoji = getEmoji(key);
  const color = keyColor(key);

  // Slightly randomised center origin
  const cx = window.innerWidth  / 2 + (Math.random() - 0.5) * 80;
  const cy = window.innerHeight / 2 + (Math.random() - 0.5) * 80;

  flashCenter(emoji);
  spawnRipple(cx, cy, color);
  spawnBurst(emoji, cx, cy, color);

  // Combo: same key pressed rapidly → flood screen
  const now = Date.now();
  if (key === lastKey && now - lastKeyTime < 300) {
    comboCount++;
    for (let i = 0; i < Math.min(comboCount * 3, 30); i++) {
      spawnFloater(
        emoji,
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        color
      );
    }
  } else {
    comboCount = 0;
  }

  lastKey = key;
  lastKeyTime = now;
});

// ─── Idle Drift ───────────────────────────────────────────────────────────────
setInterval(() => {
  if (floaters.length > 5) {
    const f = floaters[Math.floor(Math.random() * floaters.length)];
    if (f) {
      spawnFloater(
        f.emoji,
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        '#ffffff'
      );
    }
  }
}, 800);
