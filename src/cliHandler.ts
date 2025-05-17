import { viewSessions  } from "./commands/viewSession";

export function handleCLIArgs(args: string[]): boolean {
    if (args.includes("---view") || args.includes("--history")) {
        viewSessions();
        return true; // Indicates that the CLI args were handled
    }

    return false; // Indicates that the CLI args were not handled
}