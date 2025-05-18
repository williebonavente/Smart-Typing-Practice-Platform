// src/logger.ts
import readLine from "readline";
import { renderPromptRealtime } from "./ui/promptUI";

export interface Keystroke {
  key: string;
  timestamp: number;
}

const keystrokeBuffer: Keystroke[] = [];

export function getKeystrokes(): Keystroke[] {
  return keystrokeBuffer;
}

export function getTypedText(): string {
  return keystrokeBuffer.map(k => k.key).join("");
}

export function startLoggingKeystrokes(prompt: string) {

  // Clear the buffer before starting
  keystrokeBuffer.length = 0;
  if (!process.stdin.isTTY) {
    console.error("❌ This script requires a TTY (terminal) to run.");
    return;
  }

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8"); // This makes incoming data a string

  // console.log("⏺ Keystroke logging started. Press Ctrl+C to exit.\n");

  let typedText = "";

  // Initial Render
  // TODO: Fix the flickering cursor issue
  renderPromptRealtime(prompt, typedText);

  process.stdin.on("data", (key: string) => {
    const timestamp = Date.now();

    // Ctrl+C exits — don't handle it here, let index.ts handle SIGINT
    if (key === "\u0003") {
      process.stdin.setRawMode(false);
      process.emit("SIGINT");
      return;
    }
    if (key === "\r") return; // Ignore Enter key
    keystrokeBuffer.push({ key, timestamp });

    // Update typedText for display (simulate typing with backspace)
    // Reset the typedText for each keypress
    typedText = "";
    // Simulate typing with backspace
    for (const { key } of keystrokeBuffer) {
      if (key === "\x08" || key === "\x7f") {
          typedText = typedText.slice(0, -1);
      } else {
        typedText += key;
      }
    }
    // Auto-end if finished typing
    if (typedText.length >= prompt.length) {
      process.stdin.setRawMode(false);

      process.emit("SIGINT");
    }
    
    // TODO: Don't call any cursor or clear functions in this logger 
    // renderPromptRealtime(prompt, typedText, typedText.length); // Render the prompt with typed text
    renderPromptRealtime(prompt, typedText); // Render the prompt with typed text
  });
}

export function reconstructTypedText(keystrokes: { key: string }[]): string {
  let result ="";

  for (const { key } of keystrokes) {
    if (key === "\x08" || key === "\x7f") {
       // Handle backspace
       result = result.slice(0, -1);
    } else {
      result += key;
    }
  }
  return result;
}
