import chalk from "chalk";
import { showPracticeMenu } from "./practiceMenuController";
import { showMainMenu } from "./mainMenuController";
import { startTimePracticeSession } from "../practice/timePracticeSession";

export function showTimePracticeMenu() {
    console.clear();
    console.log(chalk.bold("Time-Based Practice"));
    console.log("[1] 15s");
    console.log("[2] 30s");
    console.log("[3] 60s");
    console.log("[4] 120s");
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
            case "5":
                process.stdin.off("data", onTimeMenuKey);
                process.stdin.setRawMode(false);
                const times = [15, 30, 60, 90, 120];
                const selectedTime = times[parseInt(key) - 1];
                startTimePracticeSession(selectedTime);
                break;
            case "6":
                process.stdin.off("data", onTimeMenuKey);
                process.stdin.setRawMode(false);
                // Return to practice menu
                showPracticeMenu();
                break;
            case "7":
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