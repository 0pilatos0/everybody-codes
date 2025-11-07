export function part1(input: string): string {
  const gearSizes = input.split("\n").map(line => parseInt(line.trim(), 10)).filter(n => !isNaN(n));

  let turns = 2025;
  for (let i = 0; i < gearSizes.length -1; i++) {
    const ratio = gearSizes[i] / gearSizes[i + 1];
    turns = turns * ratio;
  }

  return Math.floor(turns).toString();
}
