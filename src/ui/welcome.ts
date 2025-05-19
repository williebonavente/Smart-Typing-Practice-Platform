import { theme } from "./theme";
import { clearScreen } from "./promptUI";


const asciiArt = 
`
                            ██████╗░░█████╗░██╗░░░░░██╗░░░██╗████████╗██╗░░░██╗██████╗░███████╗
                            ██╔══██╗██╔══██╗██║░░░░░╚██╗░██╔╝╚══██╔══╝╚██╗░██╔╝██╔══██╗██╔════╝
                            ██████╔╝██║░░██║██║░░░░░░╚████╔╝░░░░██║░░░░╚████╔╝░██████╔╝█████╗░░
                            ██╔═══╝░██║░░██║██║░░░░░░░╚██╔╝░░░░░██║░░░░░╚██╔╝░░██╔═══╝░██╔══╝░░
                            ██║░░░░░╚█████╔╝███████╗░░░██║░░░░░░██║░░░░░░██║░░░██║░░░░░███████╗
                            ╚═╝░░░░░░╚════╝░╚══════╝░░░╚═╝░░░░░░╚═╝░░░░░░╚═╝░░░╚═╝░░░░░╚══════╝
    
    
`.split("\n");
;

async function printAsciiArtAnimated(lines: string[], delay = 40) {
    for (const line of lines) {
        console.log(theme.title(line));
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

export async function renderHeader(): Promise<void> {
    clearScreen(); 
    await printAsciiArtAnimated(asciiArt, 40); // 40ms delay between lines 
}