// src/theme.ts
import chalk from "chalk";

// refine later to customize the theme according to user preferences
export const theme = {
  bg: chalk.bgHex("#1a1b26"),
  fg: chalk.hex("#c0caf5"),
  correct: chalk.hex("#9ece6a"),
  error: chalk.bgHex("#f7768e").white,
  highlight: chalk.bgHex("#292e42"),
  statLabel: chalk.hex("#7aa2f7"),
  statValue: chalk.hex("#e0af68"),
  title: chalk.hex("#7dcfff").bold,
  border: chalk.hex("#3b4261"),
  cursor: chalk.inverse,
};
