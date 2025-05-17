// Handles terminal for UI rendering
import chalk from 'chalk';


export function showPrompt(prompt: string): void {
    console.clear();
    console.log(chalk.blue.bold("📘 Typing Test:"));
    console.log(chalk.white.bold(prompt));
    console.log(chalk.gray("\n💡 Start typing below:\n"));
}