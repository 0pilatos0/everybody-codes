export function part2(input: string): string {
  const numbers = input.split(",").map(num => parseInt(num, 10));
  //remove duplicates
  const uniqueNumbers = Array.from(new Set(numbers));
  uniqueNumbers.sort((a, b) => a - b);

  //only get smallest 20 numbers
  const smallest20 = uniqueNumbers.slice(0, 20);

  const sum = smallest20.reduce((acc, val) => acc + val, 0);
  return sum.toString();
}
