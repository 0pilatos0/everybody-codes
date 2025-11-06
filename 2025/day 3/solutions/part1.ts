export function part1(input: string): string {
  const numbers = input.split(",").map(num => parseInt(num, 10));
  //remove duplicates
  const uniqueNumbers = Array.from(new Set(numbers));
  uniqueNumbers.sort((a, b) => a - b);

  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);
  return sum.toString();
}
