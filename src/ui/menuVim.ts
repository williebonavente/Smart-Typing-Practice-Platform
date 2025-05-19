// Experimental Vim-like menu for a terminal application

import chalk from "chalk";
import stripAnsi from "strip-ansi";
import { renderHeader } from "./welcome"; // Assuming you have a welcome module

type Mode = "normal" | "insert";
let currentMode: Mode = "normal";
let selectedIndex = 0;

const menuItems = [
    { label: "Start Typing Practice", hotkey: "t" },
    { label: "Login / Signup", hotkey: "y" },
    { label: "Help / Command Reference", hotkey: "h" },
    { label: "Exit", hotkey: "z" }
];

renderHeader();
function renderMenuVim() {
    const menu = [
        [chalk.cyan("⌨️ ") + chalk.bold("Start Typing Practice"), chalk.blueBright("t")],
        [chalk.yellow("  ") + chalk.bold("Login / Signup"), chalk.blueBright("y")],
        [chalk.magenta("󰞋  ") + chalk.bold("Help / Command Reference"), chalk.blueBright(` h `)],
        [chalk.red("  ") + chalk.bold("Exit"), chalk.redBright("z")]
    ];

    // Find the longest label (without chalk formatting)
    const plainLabels = menu.map(([label]) => stripAnsi(label));
    const plainHotkeys = menu.map(([, hotkey]) => stripAnsi(hotkey));
    const maxLabelLength = Math.max(...plainLabels.map(l => l.length));
    const maxHotkeyLength = Math.max(...plainHotkeys.map(h => h.length));
    const menuWidth = maxLabelLength + maxHotkeyLength + 7; // 7 for borders and spacing

    const termWidth = process.stdout.columns || 80;
    const pad = Math.max(0, Math.floor((termWidth - menuWidth) / 2));
    const padStr = " ".repeat(pad);

    const line = padStr + chalk.gray("┌" + "─".repeat(menuWidth) + "┐");
    const bottom = padStr + chalk.gray("└" + "─".repeat(menuWidth) + "┘");
    // TODO: Modify the title to be more appealing
    // Center the title/logo
    // const title = theme.title("Your Typing Practice Terminal");
    const titlePad = " ".repeat(Math.max(0, Math.floor((termWidth) / 2)));

    console.log(line);
    menu.forEach(([label, hotkey], idx) => {
        const plainLabel = plainLabels[idx];
        const plainHotkey = plainHotkeys[idx];

        const labelPad = label + " ".repeat(maxLabelLength - plainLabel.length);
        const hotkeyPad = hotkey + " ".repeat(maxHotkeyLength - plainHotkey.length);
        const row = chalk.gray("│ ") +
            (idx === selectedIndex ? chalk.bgBlue.white(labelPad) : labelPad) +
            chalk.gray("         ") +
            (idx === selectedIndex ? chalk.bgBlue.white(hotkeyPad) : hotkeyPad) +
            chalk.gray(" ");
        console.log(padStr + row);

    });
    console.log(bottom);

    console.log(chalk.gray(`-- ${currentMode.toUpperCase()} --`)); // 1 line of padding at the bottom
}

export function startMenuVim() {
    renderMenuVim();

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (key: string) => {
        if (key === "\u0003") { // Ctrl+C
            process.stdin.setRawMode(false);
            process.exit();
        }

        if (currentMode === "normal") {
            if (key === "j" && selectedIndex < menuItems.length - 1) {
                selectedIndex++;
            } else if (key === "k" && selectedIndex > 0) {
                selectedIndex--;
            } else if (key === "i") {
                currentMode = "insert";
            } else if (key === "\r") { // Enter
                handleMenuSelect(selectedIndex);
                return;
            }
        } else if (currentMode === "insert") {
            if (key === "\x1b") { // ESC
                currentMode = "normal";
            }
            // Insert mode: you could allow typing to search/filter, etc.
        }
        renderMenuVim();
    });
}

function handleMenuSelect(idx: number) {
    process.stdin.setRawMode(false);
    console.clear();
    console.log(chalk.green(`Selected: ${menuItems[idx].label}`));
    // Here you can call the appropriate function for each menu item
    // e.g., if (idx === 0) startTypingPractice();
}