export function part3(input: string): string {
  const gearSizes = input.split("\n").map(line => line.split("|")).map(parts => 
    parts.map(part => parseInt(part.trim(), 10))
  )

  let turns = 100;
  for (let i = 0; i < gearSizes.length -1; i++) {
    const leftGearSize = gearSizes[i][1] ?? gearSizes[i][0];
    const rightGearSize = gearSizes[i + 1][0];

    const ratio = leftGearSize / rightGearSize;
    turns = turns * ratio;
  }

  return Math.ceil(turns).toString();
}
