import { renderMenu } from "../ui/menu";
import { showPracticeMenu } from "./practiceMenuController";
// import other actions as needed

export function showMainMenu(promptText: string) {
    renderMenu();

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    // Named handler so we can remove it later
    function onMenuKey(key: string) {
        switch (key) {
            case "t":
                process.stdin.off("data", onMenuKey); // Remove menu listener
                process.stdin.setRawMode(false);
                console.clear();
                showPracticeMenu(); // Call practice menu
                break;
            case "y":
                process.stdin.off("data", onMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                // Call your login/signup function here
                console.log("Login / Signup selected.");
                break;
            case "h":
                process.stdin.off("data", onMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                // Call your help function here
                console.log("Help / Command Reference selected.");
                break;
            case "z":
                process.stdin.off("data", onMenuKey);
                process.stdin.setRawMode(false);
                console.clear();
                console.log("Exiting...");
                process.exit();
            default:
                // Optionally, ignore or show a message for invalid keys
                break;
        }
    }

    process.stdin.on("data", onMenuKey);
}