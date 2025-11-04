export function part2(input: string): string {
  const [namesLine, , instructionsLine] = input.split("\n");
  const names = namesLine.split(",");
  const instructions = instructionsLine.split(",");

  let position = 0;

  for (const instruction of instructions) {
    const direction = instruction[0];
    const distance = Number.parseInt(instruction.slice(1), 10);

    if (direction === "R") {
      position += distance;
    } else {
      position -= distance;
    }

    console.log(`After instruction ${instruction}, landed on ${names[position]}`);
  }

  //loop around for the out of bounds
  position = ((position % names.length) + names.length) % names.length;
  return names[position];
}
