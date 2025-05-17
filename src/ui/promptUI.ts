// Handles terminal for UI rendering
import chalk from 'chalk';

export function renderPromptRealtime(prompt: string, typed: string): void {
    let output = "";
    for (let i = 0; i < prompt.length; i++) {
        const char = prompt[i];
        const typedChar = typed[i];

        if (typedChar === undefined) {
            // Not typed yet
            output += chalk.gray(char);
        } else if (typedChar === char) {
            // Correct
            output += chalk.green(char);
        } else {
            // Incorrect
            output += chalk.bgRed.white(char);
        }
    }

    // Clear the current line and print update output
    process.stdout.write("\r" + output);
}


// TODO: Enhancment of User Interface 
export function showPrompt(prompt: string): void {
    console.clear();
    console.log(chalk.blue.bold("📘 Typing Test:"));
    console.log(chalk.white.bold(prompt));
    console.log(chalk.gray("\n💡 Start typing below:\n"));
}

// ADD: Function to render the prompt with typed text
export function renderPrompt(prompt: string, typed: string): void {
    let output ="";
    for (let i = 0; i < prompt.length; i++) {
        if (typed[i] == undefined) {
            output += chalk.gray(prompt[i]);
        } else if (typed[i] === prompt[i]) {
            output += chalk.green(prompt[i]);
        } else {
            output += chalk.bgRed.white(prompt[i]);
        }
    }
    process.stdout.write("\r" + output); // Overwrite the current line
}

export function clearScreen() {
    process.stdout.write("\x1Bc"); // Clear the screen
}

export function createText(text: string, width: number) {
    const pad = Math.floor((width - text.length) / 2);
    return " ".repeat(Math.max(0, pad)) + text;
}

export function renderStats(stats: { wpm: number }, accuracyStats: { accuracy: number }) {
    const wpm = stats.wpm;
    const accuracy = accuracyStats.accuracy;
    process.stdout.write(`\n${chalk.yellow(`WPM: ${wpm}`)} 
    ${chalk.cyan(`Accuracy: ${accuracy.toFixed(2)}%`)}\n`); 
    
}