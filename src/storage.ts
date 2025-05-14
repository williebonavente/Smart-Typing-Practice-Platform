import fs from "fs";
import path from "path";
import { TypingStats } from "./analyzer";

const DATA_PATH = path.join(__dirname, "..", "data", "session.json");

export function loadSessions(): TypingStats[] {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load sessions:", err);
    return [];
  }
}

export function saveSession(stats: TypingStats) {
  const sessions = loadSessions();
  const now = new Date().toISOString();
  const sessionWithDate = { ...stats, date: now };
  sessions.push(sessionWithDate);
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(sessions, null, 2), "utf8");
    console.log("📁 Session saved to data/session.json");
  } catch (err) {
    console.error("❌ Failed to write session:", err);
  }
}
