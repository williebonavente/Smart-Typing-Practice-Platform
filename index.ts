import { startLoggingKeystrokes, getKeystrokes, getTypedText, reconstructTypedText } from "./src/logger";
import { analyzeTyping } from "./src/analyzer";
import { saveSession, loadSessions } from "./src/storage";
import { evaluatePromptTyping } from "./src/evaluator";
import { handleCLIArgs } from "./src/cliHandler";
import { getPrompt } from "./src/prompts/promptManager";
import { showPrompt,
         renderPrompt,
         renderStats,
         clearScreen
 } from "./src/ui/promptUI";
import { renderHeader } from "./src/ui/welcome"; 
import { renderMenu } from "./src/ui/menu";
 process.stdout.write("\x1B[?25l");
 // // Handle command line arguments -> CLI here
 const args = process.argv.slice(2);
 
 if (handleCLIArgs(args)) process.exit(0);
 
 const prompt = getPrompt();
//  clearScreen();
renderHeader();
renderMenu(); 
//  startLoggingKeystrokes(prompt);
 
 
 process.on("SIGINT", () => {

    // TODO: Currently working
    const keystrokes = getKeystrokes();
    
    if (!keystrokes || keystrokes.length === 0) {
        console.log("No keystrokes recorded. Exiting...");
        process.exit();
    }
    const stats = analyzeTyping({ keystrokes });
    const accuracyStats = evaluatePromptTyping(prompt, keystrokes);
    console.log("\n Prompt vs. Typed Text");
    renderPrompt(prompt, accuracyStats.history); // Compare Visually

    renderStats(stats, { accuracy: accuracyStats.accuracyPercentage }); // Render stats

    saveSession(stats);
    console.log(accuracyStats)
    console.log("✅ Session saved!");

    process.exit();
});


