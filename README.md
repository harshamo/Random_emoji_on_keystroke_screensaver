# ⌨️ Key Screensaver

A fullscreen emoji screensaver that reacts to every key you press. Built with vanilla HTML, CSS, and JavaScript — zero dependencies.

🔗 **[Live Demo](https://YOUR-USERNAME.github.io/keyboard-screensaver)**

---

## ✨ Features

- **Every key has its own emoji set** — letters, numbers, arrows, Enter, Escape, Space, and more
- **Particle burst** — each keypress triggers a radial explosion of emoji particles
- **Ripple wave** — a full-screen expanding ring animates from the center
- **Giant flash** — the emoji scales up dramatically at the center of the screen
- **Combo mode** — tap the same key rapidly to flood the screen with even more particles
- **Idle drift** — particles gently float in the background between keypresses
- **Gravity & spin** — particles arc and rotate as they fade out
- **Color-coded** — each key generates a unique hue based on its character code

---

## 🚀 Deploy to GitHub Pages

### Option A — GitHub Web UI (easiest)

1. Create a new repository on GitHub named `keyboard-screensaver`
2. Upload all files (drag & drop into the repo)
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live at `https://YOUR-USERNAME.github.io/keyboard-screensaver`

### Option B — Git CLI

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/keyboard-screensaver.git
git push -u origin main
```

Then enable GitHub Pages in your repo's **Settings → Pages** as above.

---

## 📁 File Structure

```
keyboard-screensaver/
├── index.html      # Entry point
├── style.css       # All styles and animations
├── app.js          # Particle system, key map, render loop
├── README.md       # This file
└── CLAUDE.md       # AI prompts used to build this app
```

---

## 🎮 Controls

| Key | Effect |
|-----|--------|
| Any letter `a–z` | Letter-specific emoji burst |
| Any number `0–9` | Number-specific emoji burst |
| `Space` | Galaxy explosion (💥🌌✨) |
| `Enter` | Rocket launch (🚀✅⚡) |
| `Escape` | Chill wave (🌀❄️💤) |
| `Backspace` | Destruction burst (💢❌💥) |
| `↑ ↓ ← →` | Direction-themed emojis |
| Same key rapidly | Combo mode — floods the screen! |

---

## 🛠️ Customization

**Add or change emojis for a key** — edit `keyMap` in `app.js`:

```js
keyMap['a'] = ['🦊', '🌸', '⚡', '🐉'];
```

**Change background color** — edit `body` in `style.css`:

```css
body { background: #1a0033; }
```

**Adjust particle count** — change the burst count in `spawnBurst()` in `app.js`:

```js
const count = 20; // more particles per burst
```

---

## 🧰 Tech Stack

- **HTML5 Canvas** — particle rendering with per-frame animation loop
- **CSS Animations** — ripple rings, center flash, particle keyframes
- **Vanilla JavaScript** — zero frameworks, zero dependencies

---

## 📄 License

MIT — do whatever you want with it.
