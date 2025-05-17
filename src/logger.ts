// src/logger.ts
import readLine from "readline";
import { renderPromptRealtime } from "./ui/promptUI";

export interface Keystroke {
  key: string;
  timestamp: number;
}

const keystrokeBuffer: Keystroke[] = [];
let keystrokes: { key: string; timestamp: number }[] = [];

let typedText = ""; 

export function getKeystrokes(): Keystroke[] {
  return keystrokeBuffer;
}

export function getTypedText(): string {
  const text: string[] = [];
  
  for (const { key } of keystrokeBuffer) {
    if (key === "\x7f") {
      // Handle backspace
      text.pop(); 
    } else {
      text.push(key);
    }
  }
  // return keystrokes.map(k => k.key).join(""); 
  return text.join("");
}



export function startLoggingKeystrokes() {

  // Clear the buffer before starting
  keystrokeBuffer.length = 0;
  if (!process.stdin.isTTY) {
    console.error("This script requires a TTY (terminal) to run.");
    return;
  }

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8"); // This makes incoming data a string

  console.log("⏺ Keystroke logging started. Press Ctrl+C to exit.\n");

  process.stdin.on("data", (key: string) => {
    const timestamp = Date.now();

    // Ctrl+C exits — don't handle it here, let index.ts handle SIGINT
    if (key === "\u0003") {
      process.stdin.setRawMode(false);
      
      process.emit("SIGINT");
      console.log("Exiting keystroke logging...");
      return;
    }

    // Save the keystroke and update typedText if printable

    const normalizedKey = key === " " ? "[space]" : key.replace(/\r/, "\\r");
    keystrokeBuffer.push({ key, timestamp });

    // DEBUG: Log the keystroke
    // console.log(`Key: ${normalizedKey}, Timestamp: ${timestamp}`);
  });
}
