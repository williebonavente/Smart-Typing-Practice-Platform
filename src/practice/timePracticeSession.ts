import { getPrompt } from "../prompts/promptManager";
import { startLoggingKeystrokes, getKeystrokes } from "../logger";
import { showSessionSummary } from "./sessionSummary";
import { analyzeTyping } from "../analyzer";
import { evaluatePromptTyping } from "../evaluator";

export function startTimePracticeSession(selectedTime: number) {
    const prompt = getPrompt();
    console.clear();
    console.log(`Time: ${selectedTime} seconds`);
    startLoggingKeystrokes(prompt, { timeLimit: selectedTime });

    const keystrokes = getKeystrokes();
    const stats = analyzeTyping({ keystrokes });
    const accuracyStats = evaluatePromptTyping(prompt, keystrokes);
    showSessionSummary(prompt, keystrokes, stats, accuracyStats); // Show session summary
}
