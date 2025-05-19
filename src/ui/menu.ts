import { theme } from './theme';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';


async function typewriter(text: string, pad: string) {
    for (const char of text) {
        process.stdout.write(pad + char);
        await new Promise(res => setTimeout(res, 30));
        pad = ""; // Only pad the first char
    }
    process.stdout.write('\n');
}

export function renderMenu(): void {
    // Menu: [icon+label, hotkey]
    // console.log('\n\n');
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
    // console.log(titlePad + title);
    
    console.log(line);
    menu.forEach(([label, hotkey], idx) => {
        const plainLabel = plainLabels[idx];
        const plainHotkey = plainHotkeys[idx];

        const labelPad = label + " ".repeat(maxLabelLength - plainLabel.length);
        const hotkeyPad = hotkey + " ".repeat(maxHotkeyLength - plainHotkey.length);
        const row = chalk.gray("│ ") +
            labelPad +
            chalk.gray("         ") +
            hotkeyPad
            console.log(padStr + row);
        });
        console.log(bottom);
        
        console.log(); // 1 line of padding at the bottom
        // typewriter(titlePad + title, " ");
    // After this how to add animations and other effects??

    // Example: Animated dots after menu
    // let dots = 0;
    // const interval = setInterval(() => {
    //     process.stdout.write('\r' + ' '.repeat(pad) + chalk.green('Loading' + '.'.repeat(dots % 4) + '   '));
    //     dots++;
    //     if (dots > 12) { // Stop after a few cycles
    //         clearInterval(interval);
    //         process.stdout.write('\r' + ' '.repeat(pad) + ' '.repeat(20) + '\n'); // Clear line
    //     }
    // }, 200);


}