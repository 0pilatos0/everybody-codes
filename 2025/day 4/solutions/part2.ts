export function part2(input: string): string {
  const gearSizes = input.split("\n").map(line => parseInt(line.trim(), 10)).filter(n => !isNaN(n)).reverse();

  let turns = 10000000000000;
  for (let i = 0; i < gearSizes.length -1; i++) {
    const ratio = gearSizes[i] / gearSizes[i + 1];
    turns = turns * ratio;
  }

  return Math.ceil(turns).toString();
}
