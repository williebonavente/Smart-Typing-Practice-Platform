// src/logger.ts

export interface Keystroke {
  key: string;
  timestamp: number;
}

const keystrokeBuffer: Keystroke[] = [];

export function getKeystrokes(): Keystroke[] {
  console.log("📜 Retrieving keystrokes...", keystrokeBuffer);
  return keystrokeBuffer;
}

export function startLoggingKeystrokes() {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8"); // Ensure data is emitted as strings

  console.log("⏺ Keystroke logging started. Press Ctrl+C to exit.\n");

  process.stdin.on("data", (key) => {
    const timestamp = Date.now();

    // Debugging statement
    console.log(`Key pressed: ${key}, Timestamp: ${timestamp}`);

    // Don't handle Ctrl+C here — let index.ts handle it
    if (key.toString() === "\u0003") { // Convert key to string for comparison
        console.log("⏹ Keystroke logging stopped.");
        process.stdin.pause();
        return;
    }

    const normalizedKey = key.toString() === " " ? "[space]" : key.toString().replace(/\r/, "\\r");
    keystrokeBuffer.push({ key: key.toString(), timestamp });

    console.log(`Key: ${normalizedKey}, Timestamp: ${timestamp}`);
  });
}
