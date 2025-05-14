// index.ts
import { startLoggingKeystrokes, getKeystrokes } from "./src/logger";
import { analyzeTyping } from "./src/analyzer";
import { saveSession, loadSessions } from "./src/storage";
import { viewSessions } from "./src/commands/viewSession";

// Handle command line arguments -> CLI here
const args = process.argv.slice(2);

// Check if the user wants to view past sessions 
if (args.includes("--view") || args.includes("--history")) {
    viewSessions();
    process.exit();
}

console.log("🎯 Typing Practice Terminal App Initialized");

process.on("SIGINT", () => {
    console.log("\n📊 Analyzing session...");
    const keystrokes = getKeystrokes();

    if (!keystrokes || keystrokes.length === 0) {
        console.log("No keystrokes recorded. Exiting...");
        process.exit();
    }
    const stats = analyzeTyping({ keystrokes });
    console.log("📈 Analysis complete!", stats);
    console.log("\n📝 Keystrokes:", keystrokes);
    console.log("\n🧠 Typing Stats:");
    console.log(`- Total Characters: ${stats.totalCharacters}`);
    console.log(`- Duration: ${stats.elapsedTimeSeconds.toFixed(2)} seconds`);
    console.log(`- WPM: ${stats.wpm}`);
    console.log(`- CPM: ${stats.cpm}`);

    // Save to file
    saveSession(stats);
    console.log("✅ Session saved!");



    process.exit();
});

startLoggingKeystrokes();