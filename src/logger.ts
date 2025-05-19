// src/logger.ts
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

// export function startLoggingKeystrokes(prompt: string, options?: { timeLimit?: number; }): Promise<void> {

//   // Clear the buffer before starting
//   keystrokeBuffer.length = 0;
//   if (!process.stdin.isTTY) {
//     console.error("❌ This script requires a TTY (terminal) to run.");
//     return;
//   }

//   process.stdin.setRawMode(true);
//   process.stdin.resume();
//   process.stdin.setEncoding("utf8"); // This makes incoming data a string

//   // console.log("⏺ Keystroke logging started. Press Ctrl+C to exit.\n");

//   let typedText = "";

//   // Initial Render
//   // TODO: Fix the flickering cursor issue
//   renderPromptRealtime(prompt, typedText);

//   process.stdin.on("data", (key: string) => {
//     const timestamp = Date.now();

//     // Ctrl+C exits — don't handle it here, let index.ts handle SIGINT
//     if (key === "\u0003") {
//       // Add vim functionality a like
//       process.stdin.setRawMode(false);
//       process.emit("SIGINT");
//       return;
//     }
//     if (key === "\r") return; // Ignore Enter key
//     keystrokeBuffer.push({ key, timestamp });

//     // Update typedText for display (simulate typing with backspace)
//     // Reset the typedText for each keypress
//     typedText = "";
//     // Simulate typing with backspace
//     for (const { key } of keystrokeBuffer) {
//       if (key === "\x08" || key === "\x7f") {
//           typedText = typedText.slice(0, -1);
//       } else {
//         typedText += key;
//       }
//     }
//     // Auto-end if finished typing
//     if (typedText.length >= prompt.length) {
//       process.stdin.setRawMode(false);

//       process.emit("SIGINT");
//     }
    
//     // if (options?.timeLimit) {
//     //         timer = setTimeout(() => {
//     //             process.stdin.setRawMode(false);
//     //             process.stdout.write("\n⏰ Time's up!\n");
//     //             resolve(); // <-- resolve when time is up
//     //         }, options.timeLimit * 1000);
//     //     }

//     const cursorPos = typedText.length;
    
//     // renderPromptRealtime(prompt, typedText, typedText.length); // Render the prompt with typed text
//     renderPromptRealtime(prompt, typedText, cursorPos); // Render the prompt with typed text
//   });
// }


export function startLoggingKeystrokes(prompt: string, options?: { timeLimit?: number; }): Promise<void> {
  return new Promise<void>((resolve) => {
    // Clear the buffer before starting
    keystrokeBuffer.length = 0;
    if (!process.stdin.isTTY) {
      console.error("❌ This script requires a TTY (terminal) to run.");
      resolve();
      return;
    }

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    let typedText = "";
    let timer: NodeJS.Timeout | undefined;

    renderPromptRealtime(prompt, typedText);

    function cleanup() {
      process.stdin.setRawMode(false);
      process.stdin.removeListener("data", onData);
      if (timer) clearTimeout(timer);
      resolve();
    }

    function onData(key: string) {
      const timestamp = Date.now();

      if (key === "\u0003") {
        cleanup();
        process.emit("SIGINT");
        return;
      }
      if (key === "\r") return; // Ignore Enter key
      keystrokeBuffer.push({ key, timestamp });

      typedText = "";
      for (const { key } of keystrokeBuffer) {
        if (key === "\x08" || key === "\x7f") {
          typedText = typedText.slice(0, -1);
        } else {
          typedText += key;
        }
      }

      if (typedText.length >= prompt.length) {
        cleanup();
        process.emit("SIGINT");
        return;
      }

      const cursorPos = typedText.length;
      renderPromptRealtime(prompt, typedText, cursorPos);
    }

    process.stdin.on("data", onData);

    if (options?.timeLimit) {
      timer = setTimeout(() => {
        process.stdout.write("\n⏰ Time's up!\n");
        cleanup();
        process.emit("SIGINT");
      }, options.timeLimit * 1000);
    }
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
