import { renderPrompt, renderStats } from "../ui/promptUI";
import { saveSession } from "../storage";

export function showSessionSummary(prompt: string, keystrokes: any, stats: any, accuracyStats: any) {
    console.log("\n Prompt vs. Typed Text");
    renderPrompt(prompt, accuracyStats.history); // Compare visually
    renderStats(stats, { accuracy: accuracyStats.accuracyPercentage }); // Render stats
    saveSession(stats);
    console.log(accuracyStats);
    console.log("✅ Session saved!");


    // Test for compatibility of the branch




    
}