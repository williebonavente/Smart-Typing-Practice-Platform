// Handles terminal for UI rendering
import chalk from 'chalk';
import readline from "readline"
import { theme } from "./theme";

/**
 * 
 * Render the typing prompt in real-time, higlighting correctness and showing a visual cursor.
 */

export function renderPromptRealtime(prompt: string, typed: string, cursorPos?: number): void {
    let output = "";
    for (let i = 0; i < prompt.length; i++) {
        const char = prompt[i];
        const typedChar = typed[i];

        if (i === cursorPos) {
            output += theme.cursor(char);
            continue;
        }

        if (typedChar === undefined) {
            output += theme.fg(char);
        } else if (typedChar === char) {
            output += theme.correct(char);
        } else {
            output += theme.error(char);
        }
    }
    // Clear and overwrite the current line
    readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
    readline.clearLine(process.stdout, 0); // Clear the current line
    process.stdout.write('\x1B[?25l'); // Hide cursor
    process.stdout.write(output); // Write the output
}

// TODO: Enhancment of User Interface, Expound 
export function showPrompt(prompt: string): void {
    console.clear();
    console.log(chalk.blue.bold("📘 Typing Test:"));
    console.log(chalk.white.bold(prompt));
    console.log(chalk.gray("\n💡 Start typing below:\n"));
}

// ADD: Function to render the prompt with typed text
export function renderPrompt(prompt: string, history: Array<Set<string>>): void {
    let output = "";
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