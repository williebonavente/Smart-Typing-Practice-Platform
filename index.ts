// index.ts
import { startLoggingKeystrokes, getKeystrokes } from "./src/logger";
import { analyzeTyping } from "./src/analyzer";
import { saveSession, loadSessions } from "./src/storage";
import { evaluatePromptTyping } from "./src/evaluator";
import { handleCLIArgs } from "./src/cliHandler";
import { getPrompt } from "./src/prompts/promptManager";
import { showPrompt } from "./src/ui/promptUI";

// // Handle command line arguments -> CLI here
const args = process.argv.slice(2);

if (handleCLIArgs(args)) process.exit(0);

const prompt = getPrompt();
showPrompt(prompt);
startLoggingKeystrokes();

// console.log("🎯 Typing Practice Terminal App Initialized");

process.on("SIGINT", () => {
    console.log("\n📊 Analyzing session...");
    // const keystrokes = getKeystrokes();
    const typed = getTypedText();
    const accuracyStats = evaluatePromptTyping(prompt, typed);

    // if (!keystrokes || keystrokes.length === 0) {
    //     console.log("No keystrokes recorded. Exiting...");
    //     process.exit();
    // }
    // const stats = analyzeTyping({ keystrokes });
    // console.log("📈 Analysis complete!", stats);
    // console.log("\n📝 Keystrokes:", keystrokes);
    // console.log("\n🧠 Typing Stats:");
    // console.log(`- Total Characters: ${stats.totalCharacters}`);
    // console.log(`- Duration: ${stats.elapsedTimeSeconds.toFixed(2)} seconds`);
    // console.log(`- WPM: ${stats.wpm}`);
    // console.log(`- CPM: ${stats.cpm}`);

    // // Save to file
    // saveSession(stats);
    console.log("✅ Session saved!");

    process.exit();
});
