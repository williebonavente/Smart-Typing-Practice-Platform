import { startLoggingKeystrokes, getKeystrokes, getTypedText } from "./src/logger";
import { analyzeTyping } from "./src/analyzer";
import { saveSession, loadSessions } from "./src/storage";
import { evaluatePromptTyping } from "./src/evaluator";
import { handleCLIArgs } from "./src/cliHandler";
import { getPrompt } from "./src/prompts/promptManager";
import { showPrompt,
         renderPrompt,
         clearScreen,
         createText,
         renderStats
 } from "./src/ui/promptUI";

// // Handle command line arguments -> CLI here
const args = process.argv.slice(2);

if (handleCLIArgs(args)) process.exit(0);

const prompt = getPrompt();
showPrompt(prompt);
startLoggingKeystrokes();


process.on("SIGINT", () => {
    // clearScreen();
    console.log(createText("Analayzing session...", 80)); // Adjust width as needed

    const keystrokes = getKeystrokes();
    const typed = getTypedText();
    
    if (!keystrokes || keystrokes.length === 0) {
        console.log("No keystrokes recorded. Exiting...");
        process.exit();
    }
    const stats = analyzeTyping({ keystrokes });
    const accuracyStats = evaluatePromptTyping(prompt, typed);
    console.log("\n Prompt vs. Typed Text");
    renderPrompt(prompt, typed); // Compare Visually

    renderStats(stats, { accuracy: accuracyStats.accuracyPercentage }); // Render stats

    // saveSession(stats);
    console.log(accuracyStats)
    console.log("✅ Session saved!");

    process.exit();
});
