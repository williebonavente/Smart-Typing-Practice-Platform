### ✅ Completed

- [x] **Logger Module**

  * Captures and timestamps user keystrokes via `stdin`
  * Stores data persistently in memory
* [x] **Analyzer Module**

  * Calculates typing metrics: WPM, CPM, total characters
  * Outputs detailed stats to the console after typing session

---

### 🛠️ In Progress / Next Steps
#### 🧩 1. **Text Prompt System**
*Currently doing*
* [ ] Add a text prompt generator (quote, sentence, word list)
* [ ] Display prompt at app start (or on demand)
* [ ] Log accuracy by comparing typed characters to prompt

#### 🔒 2. **User Session System (Optional for Feedback/History)**

* [ ] Add local user login/signup (basic username/password)
* [ ] Store session data (timestamp, WPM, accuracy, etc.)
* [ ] Associate stats with user for feedback/history

#### 🧠 3. **AI Feedback Module (MiniCPM-V integration)**

* [ ] Process typing data (keystrokes, mistakes, pauses)
* [ ] Generate feedback (e.g., “You tend to rush at the start”)
* [ ] Render natural language suggestion using MiniCPM-V

#### 📊 4. **Stats Dashboard**

* [ ] Show per-session stats (e.g., table format)
* [ ] Implement heatmap display (e.g., most missed keys)
* [ ] Add rhythm/flow analysis (pause time between words)

#### 💾 5. **Local Storage**

* [ ] Serialize and store keystroke logs in JSON files
* [ ] Load previous sessions on app start
* [ ] Allow exporting reports (`.txt` or `.md`)

#### ⚙️ 6. **Typing Modes**

* [ ] Add "Timed Mode" (e.g., 1-min test)
* [ ] Add "Words Mode" (e.g., 50 words test)
* [ ] Add "Freestyle Mode" (just logs everything)

---

### 🚀 Optional Enhancements

* [ ] Vim-style navigation keys
* [ ] ASCII UI rendering (Box layout for stats)
* [ ] Keyboard heatmap visualization in terminal
* [ ] Error classification (e.g., fat-finger vs. pattern mismatch)
* [ ] Autocomplete assistance or inline tips

---

### 📦 Example Output Goal

```terminal
🎯 Typing Prompt:
The quick brown fox jumps over the lazy dog.

👨‍💻 Start typing...

🧠 Typing Stats:
- Total Characters: 44
- WPM: 57.2
- Accuracy: 95.5%
- Errors: 3
- Suggestions: "Try slowing down near punctuation."
```

