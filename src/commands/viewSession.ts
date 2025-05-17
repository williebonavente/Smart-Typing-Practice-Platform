// All command logic is in this file
import { loadSessions } from "../storage";

export function viewSessions(): void {
    const sessions = loadSessions();

    if (sessions.length === 0) {
        console.log("📭 No past typing sessions found.");
        return;
    }

    console.log("📚 Past Typing Sessions:\n");

    sessions
        .slice(-5) // Last 5 sessions
        .reverse()
        .forEach((session, index) => {
            console.log(`📌 Session #${sessions.length - index}`);
            console.log(`🗓  Date        : ${session.date}`);
            console.log(`🔤 Characters  : ${session.totalCharacters}`);
            console.log(`⏱  Duration    : ${session.elapsedTimeSeconds.toFixed(2)} sec`);
            console.log(`🏃 WPM         : ${session.wpm}`);
            console.log(`🧮 CPM         : ${session.cpm}`);
            console.log("──────────────────────────────");
        });
}
