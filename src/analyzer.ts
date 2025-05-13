// src/analyzer.ts

import { Keystroke } from "./logger";

export interface TypingStats {
  totalCharacters: number;
  elapsedTimeSeconds: number;
  elapsedTimeMinutes: number;
  wpm: number;
  cpm: number;
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

  const totalCharacters = keystrokes.length;
  const startTime = keystrokes[0].timestamp;
  const endTime = keystrokes[keystrokes.length - 1].timestamp;

  const elapsedTimeSeconds = (endTime - startTime) / 1000;
  const elapsedTimeMinutes = elapsedTimeSeconds / 60;

  const wpm = parseFloat(((totalCharacters / 5) / elapsedTimeMinutes).toFixed(2));
  const cpm = parseFloat((totalCharacters / elapsedTimeMinutes).toFixed(2));

  const stats = {
    totalCharacters,
    elapsedTimeSeconds,
    elapsedTimeMinutes,
    wpm,
    cpm
  };

  console.log("Typing stats calculated:", stats);
  return stats;
}
