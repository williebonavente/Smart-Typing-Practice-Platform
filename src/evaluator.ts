// Compare prompt vs typed input (logs and accuracy)
export interface AccuracyStats {
    correct: number;
    incorrect: number;
    total: number;
    accuracyPercentage: number;
}

export function evaluatePromptTyping(prompt: string, typed: string): AccuracyStats {
    const minLen = Math.min(prompt.length, typed.length);
    let correct = 0;

    for (let i = 0; i < minLen; i++) {
        if (prompt[i] === typed[i]) correct++;
    }

    const incorrect = typed.length - correct;
    const total = prompt.length;

    const accuracyPercentage = parseFloat(((correct / total) * 100).toFixed(2));

    return {
        correct,
        incorrect,
        total,
        accuracyPercentage
    };
}