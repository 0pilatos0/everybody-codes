export function part1(input: string): string {
  let [rawNames, ...rawInstructions] = input.split("\r\n").filter((line) => line.length > 0);
  const names = rawNames.trim().split(",");

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

  for (const name of names) {
    //check if the name matches all instructions

    let matchesAll = true;

    for (const instruction of instructions) {
      //get the indexes of the from in the name
      const fromIndexes: number[] = [];
      let startIndex = 0;
      while (true) {
        const index = name.indexOf(instruction.from, startIndex);
        if (index === -1) break;
        fromIndexes.push(index);
        startIndex = index + 1;
      }

      //check if the letter following each from is in the allowedTo set
      for (const fromIndex of fromIndexes) {
        const nextIndex = fromIndex + instruction.from.length;
        const nextChar = name[nextIndex];
        if (nextChar && !instruction.allowedTo.has(nextChar)) {
          matchesAll = false;
          break;
        }
      }
    }

    //if it matches all instructions, return the name
    if (matchesAll) {
      return name;
    }
  }

  return "not implemented yet";
}
