
---

## 🎯 Goal:

Create a **clear**, **structured**, and **interactive** terminal interface that:

* Displays typing prompts
* Shows real-time feedback (WPM, timer)
* Logs keystrokes silently
* Outputs post-session stats

---

## ✅ Step-by-Step Plan for UI Design (Terminal)

### 1. **Choose a TUI Library (Tool First)**

Pick a tool so you can focus on logic, not drawing characters:

| Library               | Why Use It?                                |
| --------------------- | ------------------------------------------ |
| `blessed`             | Flexible, interactive, box-based UI layout |
| `ink` (React for CLI) | Declarative UI using JSX, like React       |
| `terminal-kit`        | High-level API with widgets and input      |
| `figlet` + `chalk`    | Styling headers and feedback with colors   |

**Recommendation:** Use [`blessed`](https://github.com/chjj/blessed) or [`ink`](https://github.com/vadimdemedes/ink) for this project.

Install example:

```bash
npm install blessed
```

---

### 2. **Define UI Areas (Design by Functionality)**

Draw a wireframe in your head or on paper — terminal is just text.

```
╔══════════════════════════════════════════════╗
║      TYPING PRACTICE TERMINAL (WMB Dev)      ║
╠══════════════════════════════════════════════╣
║ Prompt:                                      ║
║ The quick brown fox jumps over the lazy dog.║
║                                              ║
║ User Input:                                  ║
║ > the quick brwon fox jumps                  ║
║                                              ║
║ Timer: 00:13     WPM: 72.6     Errors: 2     ║
╠══════════════════════════════════════════════╣
║ Press Ctrl+C to finish and get your stats.   ║
╚══════════════════════════════════════════════╝
```

---

### 3. **Split Interface Into Components**

Think of this as **code components**, like in React or MVC:

| Component       | Purpose                                    |
| --------------- | ------------------------------------------ |
| Header          | Display app name/version                   |
| PromptDisplay   | Show the sentence the user must type       |
| InputBox        | Show what the user is typing (with cursor) |
| StatusBar       | Show WPM, timer, error count               |
| Instructions    | Show shortcuts or key actions              |
| FinalStatsModal | Show final summary after session ends      |

---

### 4. **Use Colors & Spacing Sparingly**

Use `chalk` or `blessed` color styles:

* Green for correct typing
* Red for errors
* Yellow for warnings
* Blue or gray for less critical info

---

### 5. **Start with a Static Layout First**

Even without interactivity, just print your mock UI using:

```ts
console.clear();
console.log(`
╔══════════════════════════════════════════════╗
║      TYPING PRACTICE TERMINAL (WMB Dev)      ║
╠══════════════════════════════════════════════╣
║ Prompt:                                      ║
║ The quick brown fox jumps over the lazy dog.║
║                                              ║
║ User Input:                                  ║
║ >                                            ║
║                                              ║
║ Timer: 00:00     WPM: 0.0     Errors: 0      ║
╠══════════════════════════════════════════════╣
║ Press Ctrl+C to finish and get your stats.   ║
╚══════════════════════════════════════════════╝
`);
```

---

### 6. **Make an Iterative Plan (UI Phases)**

| Phase | What to Build                           |
| ----- | --------------------------------------- |
| 1     | Static layout in console                |
| 2     | Update input in real-time               |
| 3     | Highlight correct/incorrect characters  |
| 4     | Add timer and update stats live         |
| 5     | Show final modal/stats summary          |
| 6     | Polish with box layout (blessed or ink) |

---

## 🔥 Sample UI Component Logic

```ts
function renderStatusBar(wpm: number, timer: string, errors: number) {
  return `Timer: ${timer}     WPM: ${wpm.toFixed(1)}     Errors: ${errors}`;
}
```

---

## 🧭 Decision-Making Tips

* ✅ **Done is better than perfect** — build a working shell first
* ❌ Don’t worry about pixel-perfect spacing
* ✅ Focus on clarity: borders, labels, alignment
* ✅ Iterate: make it interactive after it's readable

---

## 📦 Actionable Next Step for You

* [ ] Choose and install a TUI library (`blessed` or `ink`)
* [ ] Create `src/ui.ts` to hold layout/render logic
* [ ] Render a **static UI** with header, prompt, input, and status
* [ ] Hook the `logger` into the input box
* [ ] Refresh status bar every keystroke or second

Want a basic scaffold or starter UI code with `blessed` or `ink`? Just ask — I’ll generate a working starting point.



| Library                                                   | Description                         | Link                      |
| --------------------------------------------------------- | ----------------------------------- | ------------------------- |
| [`blessed`](https://github.com/chjj/blessed)              | Powerful curses-like terminal UI    | Mature, flexible          |
| [`ink`](https://github.com/vadimdemedes/ink)              | React-style UI for CLI apps         | Great for structured apps |
| [`terminal-kit`](https://github.com/cronvel/terminal-kit) | Color, menus, full terminal control | Rich but lower-level      |
| [`chalk`](https://github.com/chalk/chalk)                 | Simple text styling                 | Use for colors/logs       |
