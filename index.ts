import { startLoggingKeystrokes, getKeystrokes } from "./src/logger";
import { analyzeTyping } from "./src/analyzer";
import { saveSession, loadSessions } from "./src/storage";
import { evaluatePromptTyping } from "./src/evaluator";
import { handleCLIArgs } from "./src/cliHandler";
import { getPrompt } from "./src/prompts/promptManager";
import { renderPrompt,
         renderStats,
 } from "./src/ui/promptUI";
import { renderHeader } from "./src/ui/welcome"; 
import { showMainMenu } from "./src/controller/mainMenuController";
import { renderMenu } from "./src/ui/menu";
 // // Handle command line arguments -> CLI here
 const args = process.argv.slice(2);
 
 if (handleCLIArgs(args)) process.exit(0);
 
 const prompt = getPrompt();
//  clearScreen();
(async () => {
    showMainMenu(prompt);
    // renderMenu();
    // TODO: Optional Enhancement 
    // startMenuVim();
    // startLoggingKeystrokes(prompt);
})();

process.on("SIGINT", () => {
    // TODO: Currently working
    const keystrokes = getKeystrokes();
    
    if (!keystrokes || keystrokes.length === 0) {
        console.log("No keystrokes recorded. Exiting...");
        process.exit();
    }
    // const stats = analyzeTyping({ keystrokes });
    // const accuracyStats = evaluatePromptTyping(prompt, keystrokes);
    console.log("\n Prompt vs. Typed Text");
    // renderPrompt(prompt, accuracyStats.history); // Compare Visually
 
    // renderStats(stats, { accuracy: accuracyStats.accuracyPercentage }); // Render stats
 
    // saveSession(stats);
    // console.log(accuracyStats)
    console.log("✅ Session saved!");
 
    process.exit();
 
});


