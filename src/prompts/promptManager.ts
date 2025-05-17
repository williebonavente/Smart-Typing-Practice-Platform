// Load, display, and manage prompts

const prompts = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "The only thing we have to fear is fear itself.",
];

export function getPrompt(): string {
    // TODO: Support fetching from API later
    return prompts[Math.floor(Math.random() * prompts.length)];
}