export function part3(input: string): string {
  const pattern = input.trim();
  const REPETITIONS = 1000;
  const DISTANCE_LIMIT = 1000;

  // Create the full string by repeating the pattern
  const fullString = pattern.repeat(REPETITIONS);

  let totalPairs = 0;

  // For each position in the full string
  for (let i = 0; i < fullString.length; i++) {
    const current = fullString[i];

    // Check if it's a novice (lowercase letter)
    if (current === current.toLowerCase() && current !== current.toUpperCase()) {
      const mentor = current.toUpperCase();

      // Count mentors within the distance limit
      const start = Math.max(0, i - DISTANCE_LIMIT);
      const end = Math.min(fullString.length - 1, i + DISTANCE_LIMIT);

      for (let j = start; j <= end; j++) {
        if (j !== i && fullString[j] === mentor) {
          totalPairs++;
        }
      }
    }
  }

  return totalPairs.toString();
}
