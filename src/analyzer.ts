// src/analyzer.ts

import { Keystroke } from "./logger";

export interface TypingStats {
  totalCharacters: number;
  elapsedTimeSeconds: number;
  elapsedTimeMinutes: number;
  wpm: number;
  cpm: number;
  // Add any other properties you want to include in the stats
  // For example, you might want to include the date of the session
  date?: string; // Optional date property
  // add more typing-related statistics if needed
}

/**
 * Analyzes typing data and calculates typing statistics such as total characters,
 * elapsed time, words per minute (WPM), and characters per minute (CPM).
 *
 * @param {Object} params - The input parameters.
 * @param {Keystroke[]} params.keystrokes - An array of keystroke objects, each containing a timestamp.
 * @returns {TypingStats} An object containing typing statistics:
 * - `totalCharacters`: The total number of characters typed.
 * - `elapsedTimeSeconds`: The total elapsed time in seconds.
 * - `elapsedTimeMinutes`: The total elapsed time in minutes.
 * - `wpm`: Words per minute, calculated as (total characters / 5) divided by elapsed time in minutes.
 * - `cpm`: Characters per minute, calculated as total characters divided by elapsed time in minutes.
 */
export function analyzeTyping({ keystrokes }: { keystrokes: Keystroke[]; }): TypingStats {
  console.log("Analyzing keystrokes...", keystrokes);
  if (keystrokes.length === 0) {
    console.log("No keystrokes recorded.");
    return {
      totalCharacters: 0,
      elapsedTimeSeconds: 0,
      elapsedTimeMinutes: 0,
      wpm: 0,
      cpm: 0
    };
  }

  // Calculate total characters, elapsed time, WPM, and CPM
  const totalCharacters = keystrokes.length;
  const startTime = keystrokes[0].timestamp;
  const endTime = keystrokes[keystrokes.length - 1].timestamp;

  const elapsedTimeSeconds = (endTime - startTime) / 1000;
  const elapsedTimeMinutes = elapsedTimeSeconds / 60;

  const wpm = parseFloat(((totalCharacters / 5) / elapsedTimeMinutes).toFixed(2));
  const cpm = parseFloat((totalCharacters / elapsedTimeMinutes).toFixed(2));

  // Date is optional, so we can set it to undefined or a specific date
  const date = new Date().toISOString(); // Current date in ISO format
  // If you want to set a specific date, you can do so here
  // const date = "2023-10-01T12:00:00Z"; // Example specific date
  // If you want to include the date in the stats, you can add it to the return object
  // const date = new Date().toISOString(); // Current date in ISO format
  const stats = {
    totalCharacters,
    elapsedTimeSeconds,
    elapsedTimeMinutes,
    wpm,
    cpm,
    date // Include the date in the stats
  };
  // Log the stats for debugging
  console.log("Typing stats calculated:", stats);
  return stats;
}
