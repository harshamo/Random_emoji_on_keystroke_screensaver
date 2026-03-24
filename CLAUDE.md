# CLAUDE.md — AI Instructions & Prompts

This file documents the prompts and instructions used to create the **Key Screensaver** app using [Claude](https://claude.ai) by Anthropic.

---

## 💬 Conversation Prompts

### Prompt 1 — Initial App Creation

> "create a web app that will generate an emoji or visualization on click of a keyboard key. emoji or visualization should fill up full window like how screensaver does"

**What Claude built:**
- Single-file HTML app with embedded CSS and JavaScript
- Fullscreen canvas-based particle system
- Per-key emoji mapping for letters, numbers, and special keys
- Center flash animation (giant emoji scales in and fades out)
- Expanding ripple ring effect on each keypress
- Radial particle burst — 22 particles per keypress with physics
- Idle drift particles that float between keypresses
- Combo detection: rapid same-key presses flood the screen
- Hint text ("press any key") that fades on first interaction
- Dark background (`#0a0a0f`), cursor hidden for immersion

---

### Prompt 2 — GitHub-Ready File Structure

> "create a file structure that i can load to github and deploy in github pages. include readme file and claude.md file with list of instructions you used to create this app"

**What Claude built:**
- Split the single-file app into three separate files: `index.html`, `style.css`, `app.js`
- Created `README.md` with setup instructions, controls, file structure, and customization guide
- Created this `CLAUDE.md` file documenting the AI prompts
- Structured for GitHub Pages deployment (static site, no build step required)

---

## 🧠 Design Decisions Claude Made

### Aesthetic Direction
- **Dark, immersive background** (`#0a0a0f`) — near-black with a slight blue tint for depth
- **No UI chrome** — cursor hidden, no visible buttons or menus; the keyboard IS the interface
- **Screensaver metaphor** — particles drift and fade like a classic screensaver, filling the void between presses

### Technical Architecture

#### Particle System
- Custom canvas-based renderer using `requestAnimationFrame`
- Each particle is a plain JS object: `{ emoji, x, y, vx, vy, size, life, decay, spin, angle }`
- Gravity applied per frame: `f.vy += 0.04 * dt`
- Delta-time (`dt`) capped at 3× to prevent spiral jumps on tab switch/resume
- Particles removed from array when `life <= 0` (reverse-loop to avoid index shift bugs)

#### Key→Color Mapping
- Each key gets a deterministic HSL hue from its char code: `hsl(charCode * 37 % 360, 90%, 65%)`
- Same key always produces the same color family, different keys look distinct

#### Two Spawn Modes
1. **`spawnBurst()`** — triggered on keypress; 14 radial + 8 scattered particles from center
2. **`spawnFloater()`** — triggered on combos and idle; random screen position, slower decay

#### CSS Animations (non-canvas)
- **Center flash** — `#key-display` uses a `@keyframes keyflash` animation (scale 0.5 → 1.1 → 1, opacity 1 → 0)
- **Ripple rings** — DOM `<div>` elements injected and removed after 1s; `@keyframes ripple-expand` scales from 0 to full width
- Reflow hack (`void el.offsetWidth`) used to restart CSS animation on repeat keypresses

#### Combo System
```js
if (key === lastKey && now - lastKeyTime < 300) {
  comboCount++;
  // spawn comboCount * 3 extra floaters (capped at 30)
}
```

### Emoji Curation Philosophy
- Each letter has 7 emojis chosen for thematic resonance (e.g., `f` → 🔥🌸🐸🎆)
- Numbers have numeric/shape associations (e.g., `8` → 🎱♾️🕸️)
- Special keys reflect their function (e.g., `Escape` → 🌀💨❄️😴)
- Random selection from pool on each press = variety without chaos

---

## 🔧 Model & Tool Used

- **Model:** Claude Sonnet 4.6 (claude.ai)
- **Interface:** Claude.ai web chat with computer use / file creation enabled
- **Files generated:** `index.html`, `style.css`, `app.js`, `README.md`, `CLAUDE.md`
- **Dependencies:** None — pure HTML/CSS/JS, no npm, no build step

---

## 📌 Reproduction Instructions

To regenerate this app from scratch using Claude:

1. Go to [claude.ai](https://claude.ai)
2. Start a new conversation
3. Paste Prompt 1 above
4. Review the single-file output in the artifact/preview panel
5. Paste Prompt 2 to get a GitHub-ready file structure
6. Download the generated files and push to GitHub
7. Enable GitHub Pages in repository Settings → Pages → Source: `main / root`
