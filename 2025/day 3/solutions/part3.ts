export function part3(input: string): string {
  const numbers = input
    .split(",")
    .map(s => Number(s.trim()))

  numbers.sort((a, b) => a - b);

  let maxCount = 1;
  let runCount = 1;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1]) {
      runCount++;
      if (runCount > maxCount) maxCount = runCount;
    } else {
      runCount = 1;
    }
  }

  return String(maxCount);
}
