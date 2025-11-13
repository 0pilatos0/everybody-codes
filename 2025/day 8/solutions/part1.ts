export function part1(input: string): string {
  const NAILS = 32;
  const instructions = input.split(",").map((num) => parseInt(num.trim(), 10));

  let centerCrossings = 0;

  for (let i = 0; i < instructions.length - 1; i++) {
    const current = instructions[i];
    const next = instructions[i + 1];
    const diff = Math.abs(next - current);
    if (diff === NAILS / 2) {
      centerCrossings++;
    }
  }

  return centerCrossings.toString();
}
