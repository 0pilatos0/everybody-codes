export function part3(input: string): string {
  let [rawNames, ...rawInstructions] = input.split("\r\n").filter((line) => line.length > 0);
  const prefixes = rawNames
    .trim()
    .split(",")
    .map((p) => p.trim());

  type Instruction = {
    from: string;
    allowedTo: Set<string>;
  };

  const instructions: Instruction[] = rawInstructions.map((line) => {
    const [from, allowed] = line.split(" > ");
    return {
      from,
      allowedTo: new Set(allowed.split(",")),
    };
  });

  // Build a lookup map for faster access: character -> allowed next characters
  const nextCharMap = new Map<string, Set<string>>();
  for (const instruction of instructions) {
    nextCharMap.set(instruction.from, instruction.allowedTo);
  }

  // Generate all valid names from a prefix using recursion
  function generateNames(prefix: string, validNames: Set<string>): void {
    const length = prefix.length;

    // If we're at 7-11 characters, add to valid names
    if (length >= 7 && length <= 11) {
      validNames.add(prefix);
    }

    // If we've reached 11 characters, stop extending
    if (length >= 11) {
      return;
    }

    // Get the last character of the current prefix
    const lastChar = prefix[prefix.length - 1];

    // Find what characters can follow this character
    const allowed = nextCharMap.get(lastChar);
    if (!allowed) {
      // No rule for this character, can't extend further
      return;
    }

    // Recursively generate names by adding each allowed character
    for (const nextChar of allowed) {
      generateNames(prefix + nextChar, validNames);
    }
  }

  // Collect all valid names from all prefixes
  let allValidNames = new Set<string>();

  for (const prefix of prefixes) {
    // Check if the prefix itself is valid (no rule violations at the boundaries)
    let isValidStart = true;

    // Check if prefix starts violate any single-char rules
    for (let i = 0; i < prefix.length - 1; i++) {
      const char = prefix[i];
      const nextChar = prefix[i + 1];
      const allowed = nextCharMap.get(char);
      if (allowed && !allowed.has(nextChar)) {
        isValidStart = false;
        break;
      }
    }

    if (isValidStart) {
      generateNames(prefix, allValidNames);
    }
  }

  return allValidNames.size.toString();
}
