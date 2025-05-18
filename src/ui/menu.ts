import { theme } from './theme';
import chalk from 'chalk';

// create a function to render the menu

export function renderMenu(): void {
//  Main Menu of the Application

// TODO: Polish the UI
/*
        [1] Start Typing Practice  // Anonymous User
             [1] Time-Based Practice
             [2] Word Count-Based
             [3] Character Length-Based
             [4] Return to Main Menu

        [2] Login / Signup
             [1] Signup
             [2] Login
                   [1] View Typing Dashboard Details
		[1] Heatmap (Typing Frequency & Error Heatmap)
		[2] WPM / CPM Over Time (Graph View)
		[3] Accuracy Progression
		[4] Streak / Consistency Tracker
		[5] Back
	       [2] View Past Sessions
                   [3] Start Practice
                   [4] Logout
                [3] Back to Main Menu
        [3] Help / Command Reference
        [4] Exit

*/
const menu = [
    
        [chalk.bold(`   1   `), "Start Typing Practice", chalk.gray("Anonymous User")],
        [chalk.bold("2"), "Login / Signup", ""],
        [chalk.bold("3"), "Help / Command Reference", ""],
        [chalk.bold("4"), "Exit", ""]
    ];

    const submenus = [
        ["  1.1", "Time-Based Practice"],
        ["  1.2", "Word Count-Based"],
        ["  1.3", "Character Length-Based"],
        ["  1.4", "Return to Main Menu"],
        ["  2.1", "Signup"],
        ["  2.2", "Login"],
        ["    2.2.1", "View Typing Dashboard Details"],
        ["    2.2.2", "View Past Sessions"],
        ["    2.2.3", "Start Practice"],
        ["    2.2.4", "Logout"],
        ["    2.2.5", "Back to Main Menu"]
    ];

    // Draw table
    const line = chalk.gray("┌" + "─".repeat(38) + "┐");
    const bottom = chalk.gray("└" + "─".repeat(38) + "┘");
    console.log(theme.title("Star Typing Practice"));
    console.log(line);
    menu.forEach(([num, label, desc]) => {
        const row = chalk.gray("│ ") +
            chalk.cyan(num.padEnd(2)) +
            chalk.white(label.padEnd(25)) +
            chalk.gray(desc.padEnd(8)) +
            chalk.gray(" │");
        console.log(row);
    });
    console.log(bottom);

    // Optionally, show submenus
    submenus.forEach(([num, label]) => {
        console.log(
            chalk.gray("   ") +
            chalk.cyan(num.padEnd(8)) +
            chalk.white(label)
        );
    });

console.log(theme.title(`Star Typing Practice`));
console.log(chalk.yellow("⌨️  ") + theme.title("Star Typing Practice"));
}