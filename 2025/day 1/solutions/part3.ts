export function part3(input: string): string {
  const [namesLine, , instructionsLine] = input.split("\n");
  const names = namesLine.split(",");
  const instructions = instructionsLine.split(",");

  for (const instruction of instructions) {
    const direction = instruction[0];
    const distance = Number.parseInt(instruction.slice(1), 10);
    let swapIndex: number;
    if (direction === "R") {
      swapIndex = distance % names.length;
    } else {
      swapIndex = ((-distance % names.length) + names.length) % names.length;
    }

    const temp = names[0];
    names[0] = names[swapIndex];
    names[swapIndex] = temp;

    console.log(`After instruction ${instruction}, names are now: ${names.join(",")}`);
  }

  return names[0];
}
