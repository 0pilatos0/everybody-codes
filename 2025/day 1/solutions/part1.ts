export function part1(input: string): string {
  const [namesLine, , instructionsLine] = input.split("\n");
  const names = namesLine.split(",");
  const instructions = instructionsLine.split(",");

  let position = 0;

  for (const instruction of instructions) {
    const direction = instruction[0];
    const distance = Number.parseInt(instruction.slice(1), 10);

    if (direction === "R") {
      position = Math.min(position + distance, names.length - 1);
    } else {
      position = Math.max(position - distance, 0);
    }

    console.log(`After instruction ${instruction}, landed on ${names[position]}`);
  }

  return names[position];
}
