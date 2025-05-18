// Compare prompt vs typed input (logs and accuracy)
import { reconstructTypedText } from "./logger";

export interface AccuracyStats {
    correct: number;
    incorrect: number;
    total: number;
    accuracyPercentage: number;
    notTyped? : number // property to track characters not typed
    history: Array<Set<string>>; // Track all characters ever typed at each position
}

export function evaluatePromptTyping(prompt: string, keystrokes: { key: string }[]): AccuracyStats {
    // const typed = reconstructTypedText(keystrokes); // Later remove this part of the code
    // const minLen = Math.min(prompt.length, typed.length);

    // Track all characters ever typed at each position
    const history: Array<Set<string>> = [];
    let cursor = 0;

    for (const { key } of keystrokes) {
        if (key === "\x08" || key === "\x7f") {
            if (cursor > 0) cursor--;
        } else {
            if (!history[cursor]) history[cursor] = new Set();
            history[cursor].add(key);
            cursor++;
        }
    }
    let correct = 0;
    let notTyped = 0;
    let incorrect = 0;

    for (let i = 0; i < prompt.length; i++) {
        if (!history[i] || history[i].size === 0) {
            notTyped++;
        } else if (
            history[i].size === 1 &&
            history[i].has(prompt[i])
        ) {
            // Only the correct character was typed
            correct++;
        } else {
            // Any wrong character was ever typed
            incorrect++;
        }
    }
    
    const total = prompt.length;
    const accuracyPercentage = parseFloat(((correct / total) * 100).toFixed(2));

    return {
        correct,
        incorrect,
        total,
        accuracyPercentage,
        notTyped,
        history
    };
}