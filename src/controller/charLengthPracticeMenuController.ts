import chalk from "chalk";
import { showPracticeMenu } from "./practiceMenuController";
import { showMainMenu } from "./mainMenuController";

export function showCharLengthPracticeMenu() {
    console.clear();
    console.log(chalk.bold("Time-Based Practice"));
    console.log("[1] 25c");
    console.log("[2] 50c");
    console.log("[3] 75c");
    console.log("[4] 100c");
    console.log("[5] Return to Practice Menu");
    console.log("[6] Return to Main Menu");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    function onTimeMenuKey(key: string) {
        switch (key) {
            case "1":
            case "2":
            case "3":
            case "4":
                process.stdin.off("data", onTimeMenuKey);
                process.stdin.setRawMode(false);
                const times = [25, 50, 75, 100];
                const selectedNumberOfChar = times[parseInt(key) - 1];
                console.clear();
                console.log(`Characters: ${selectedNumberOfChar}`);
                // Start time-based practice here
                break;
            case "5":
                process.stdin.off("data", onTimeMenuKey);
                process.stdin.setRawMode(false);
                // Return to practice menu
                showPracticeMenu();
                break;
            case "6":
                process.stdin.off("data", onTimeMenuKey);
                process.stdin.setRawMode(false);
                // Return to main menu
                showMainMenu("");
                break;
            default:
                break;
        }
    }

    process.stdin.on("data", onTimeMenuKey);
}