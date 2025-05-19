import chalk from "chalk";
import { time } from "console";
import { showTimePracticeMenu } from "./timePracticeMenuController";
import { showWordCountMenu } from "./wordCountPracticeMenuController";
import { showCharLengthPracticeMenu } from "./charLengthPracticeMenuController";
import { showMainMenu } from "./mainMenuController";

export function showPracticeMenu() {
    console.clear();
    console.log(chalk.bold("[1] Start Typing Practice  // Anonymous User"));
    console.log("   [1] Time-Based Practice");
    console.log("   [2] Word Count-Based");
    console.log("   [3] Character Length-Based");
    console.log("   [4] Return to Main Menu");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    function onPracticeMenuKey(key: string) {
        switch (key) {
            case "1":
                process.stdin.off("data", onPracticeMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                showTimePracticeMenu(); // Call time-based practice menu 
                break;
            case "2":
                process.stdin.off("data", onPracticeMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                // Call your word count-based practice function here
                showWordCountMenu();
                break;
            case "3":
                process.stdin.off("data", onPracticeMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                // Call your character length-based practice function here
                showCharLengthPracticeMenu();
                break;
            case "4":
                process.stdin.off("data", onPracticeMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                showMainMenu("");
                break;
            default:
                // Optionally, ignore or show a message for invalid keys
                break;
        }
    }

    process.stdin.on("data", onPracticeMenuKey);
}