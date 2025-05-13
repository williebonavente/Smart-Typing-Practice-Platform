// index.ts
import { startLoggingKeystrokes, getKeystrokes } from "./src/logger";
import { analyzeTyping } from "./src/analyzer";

console.log("🎯 Typing Practice Terminal App Initialized");

process.on("SIGINT", () => {
    console.log("\n📊 Analyzing session...");
    const keystrokes = getKeystrokes();
    const stats = analyzeTyping({ keystrokes });
    console.log("📈 Analysis complete!", stats);
    console.log("\n📝 Keystrokes:", keystrokes);
    console.log("\n🧠 Typing Stats:");
    console.log(`- Total Characters: ${stats.totalCharacters}`);
    console.log(`- Duration: ${stats.elapsedTimeSeconds.toFixed(2)} seconds`);
    console.log(`- WPM: ${stats.wpm}`);
    console.log(`- CPM: ${stats.cpm}`);
  
    process.exit();

});


startLoggingKeystrokes();