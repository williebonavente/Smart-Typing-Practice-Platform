// Handles terminal for UI rendering
import chalk from 'chalk';
import { read } from 'fs';
import readline from "readline";

export function renderPromptRealtime(prompt: string, typed: string, cursorPos?: number): void {
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
    readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
    process.stdout.write("\r" + output);

    // Move cursor to the desired position
    if (typeof cursorPos === 'number') readline.cursorTo(process.stdout, cursorPos);
    else readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
}


// TODO: Enhancment of User Interface 
export function showPrompt(prompt: string): void {
    console.clear();
    console.log(chalk.blue.bold("📘 Typing Test:"));
    console.log(chalk.white.bold(prompt));
    console.log(chalk.gray("\n💡 Start typing below:\n"));
}

// ADD: Function to render the prompt with typed text
export function renderPrompt(prompt: string, history: Array<Set<string>>): void {
    let output ="";
    for (let i = 0; i < prompt.length; i++) {
        if (!history[i] || history[i].size === 0) {
            output += chalk.gray(prompt[i]);
        } else if (
            history[i].size === 1 &&
            history[i].has(prompt[i])
        ) {
            output += chalk.green(prompt[i]);
        } else if (history[i].has(prompt[i])) {
            output += chalk.bgRed.green(prompt[i]);
        }
         else {
            // Only mistakes
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