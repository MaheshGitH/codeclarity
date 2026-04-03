type SpeakingPace = "Slow" | "Good" | "Fast" | "N/A";
type Clarity = "Unclear" | "Okay" | "Clear";
type Structure = "Poor" | "Good" | "Strong";
type Length = "Too Short" | "Good" | "Too Long";

export type Feedback = {
  wpm: number | null;
  speakingPace: SpeakingPace;
  clarity: Clarity;
  structure: Structure;
  length: Length;
  suggestions: string[];
  isShortSample: boolean;
};

const SUGGESTIONS: Record<string, string[]> = {
  // Pace
  pace_slow: [
    "You're explaining too slowly — interviewers may lose focus. Pick up the pace slightly.",
    "Avoid over-explaining each line; zoom out and explain the intent first.",
    "Practise narrating code out loud until it feels natural and fluid.",
  ],
  pace_fast: [
    "You're rushing — slow down when explaining complex logic so the interviewer can follow.",
    "Pause after each major block (e.g. after explaining a loop) before moving on.",
    "Don't race through edge cases; those are often what interviewers care most about.",
  ],
  pace_good: [
    "Solid pace — you're giving the interviewer enough time to follow your logic.",
  ],
  pace_na: [
    "Your explanation was too brief to measure pace — try walking through the full solution.",
    "Aim to narrate your thought process from start to finish, not just the final answer.",
  ],

  // Clarity
  clarity_unclear: [
    "Avoid vague terms like 'this thing' or 'it does stuff' — name variables and methods explicitly.",
    "Use precise language: say 'I initialise a hash map to track frequencies' not 'I use a map for stuff'.",
    "Structure your explanation: what the code does → why you chose this approach → trade-offs.",
  ],
  clarity_okay: [
    "Try leading with the high-level idea before diving into implementation details.",
    "When you mention a data structure, briefly say why you chose it over alternatives.",
  ],
  clarity_clear: [
    "Clear explanation — the interviewer can follow your reasoning without guessing.",
  ],

  // Structure
  structure_poor: [
    "Start with the problem restatement, then your approach, then walk the code top-down.",
    "Don't jump straight into line-by-line — explain the algorithm intent first.",
    "Finish with complexity analysis: mention time and space complexity at the end.",
  ],
  structure_good: [
    "Good flow. Strengthen it by explicitly stating time and space complexity at the end.",
    "Try transitioning between sections: 'Now that I've set up the base case, let me handle...'",
  ],
  structure_strong: [
    "Well structured — you covered the approach, implementation, and reasoning clearly.",
  ],

  // Length
  length_too_short: [
    "Your explanation is too brief — walk through the logic block by block.",
    "Mention your reasoning: why a hashmap over an array, why recursion over iteration.",
    "Cover edge cases out loud: empty input, single element, duplicates, overflow.",
  ],
  length_good: ["Good depth — detailed enough without losing the interviewer."],
  length_too_long: [
    "You're over-explaining — trust that the interviewer understands basic syntax.",
    "Skip narrating boilerplate; focus on the non-obvious parts of your solution.",
    "Aim to explain your solution in under 2 minutes, then invite questions.",
  ],

  // Short sample
  short_sample: [
    "Under 60 seconds is too short for a coding explanation — WPM data may be unreliable.",
  ],
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function calculateWPM(
  wordCount: number,
  durationSeconds: number,
): number | null {
  if (durationSeconds <= 0 || wordCount < 10) return null;
  const minutes = durationSeconds / 60;
  return Math.round(wordCount / minutes);
}

function getPace(wpm: number | null, wordCount: number): SpeakingPace {
  if (wpm === null || wordCount < 10) return "N/A";
  if (wpm < 110) return "Slow";
  if (wpm <= 150) return "Good";
  return "Fast";
}

function getClarity(transcript: string, wordCount: number): Clarity {
  if (wordCount < 10) return "Unclear";

  const fillerRegex =
    /\b(um+|uh+|er+|like|you know|basically|literally|actually|so yeah|i mean)\b/gi;
  const fillerMatches = transcript.match(fillerRegex) ?? [];
  const fillerRatio = fillerMatches.length / wordCount;

  if (fillerRatio > 0.08) return "Unclear";
  if (fillerRatio > 0.04) return "Okay";
  return "Clear";
}

function getStructure(transcript: string, wordCount: number): Structure {
  if (wordCount < 20) return "Poor";

  const lower = transcript.toLowerCase();

  const hasOpener =
    /\b(so|well|to answer|in my (previous|last|current)|at my|when i|i was|the situation|i'd say)\b/.test(
      lower,
    );
  const hasAction =
    /\b(i (decided|chose|implemented|built|led|managed|worked|created|solved|helped|used|designed))\b/.test(
      lower,
    );
  const hasResult =
    /\b(as a result|which (led|resulted|helped)|the outcome|we (achieved|improved|reduced|increased|saved)|ultimately|in the end)\b/.test(
      lower,
    );
  const hasConnectors =
    /\b(first|then|after that|next|finally|because|therefore|however|although)\b/.test(
      lower,
    );

  const score = [hasOpener, hasAction, hasResult, hasConnectors].filter(
    Boolean,
  ).length;

  if (score >= 3) return "Strong";
  if (score >= 1) return "Good";
  return "Poor";
}

function getLength(durationSeconds: number): Length {
  if (durationSeconds < 30) return "Too Short";
  if (durationSeconds <= 150) return "Good";
  return "Too Long";
}

export function analyzeSpeech(
  transcript: string,
  durationSeconds: number,
): Feedback {
  const wordCount = countWords(transcript);
  const wpm = calculateWPM(wordCount, durationSeconds);
  const isShortSample = durationSeconds < 60;

  const speakingPace = getPace(wpm, wordCount);
  const clarity = getClarity(transcript, wordCount);
  const structure = getStructure(transcript, wordCount);
  const length = getLength(durationSeconds);

  const suggestions: string[] = [
    ...(SUGGESTIONS[`pace_${speakingPace.toLowerCase()}`] ?? []),
    ...(SUGGESTIONS[`clarity_${clarity.toLowerCase()}`] ?? []),
    ...(SUGGESTIONS[`structure_${structure.toLowerCase()}`] ?? []),
    ...(SUGGESTIONS[`length_${length.toLowerCase().replace(/\s+/g, "_")}`] ??
      []),
    ...(isShortSample ? SUGGESTIONS.short_sample : []),
  ];

  const hasIssues =
    speakingPace !== "Good" ||
    clarity !== "Clear" ||
    structure !== "Strong" ||
    length !== "Good";

  const filteredSuggestions = hasIssues
    ? suggestions.filter(
        (s) =>
          !s.startsWith("Great pace") &&
          !s.startsWith("Excellent clarity") &&
          !s.startsWith("Well structured") &&
          !s.startsWith("Good answer length"),
      )
    : suggestions;

  return {
    wpm,
    speakingPace,
    clarity,
    structure,
    length,
    suggestions: [...new Set(filteredSuggestions)],
    isShortSample,
  };
}
