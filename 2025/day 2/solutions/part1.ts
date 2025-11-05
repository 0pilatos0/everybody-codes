export function part1(input: string): string {
  const startingPoint = input.split("=")[1].replace("[", "").replace("]", "").split(",");
  const a = parseInt(startingPoint[0], 10);
  const b = parseInt(startingPoint[1], 10);

  const [complexX, complexY] = [a, b];

  function AddComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
    return [complexX + resultX, complexY + resultY];
  }

  function multiplyComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
    return [complexX * resultX - complexY * resultY, complexX * resultY + complexY * resultX];
  }

  function devideComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
    return [Math.floor(complexX / resultX), Math.floor(complexY / resultY)];
  }

  let [resX, resY] = [0, 0];
  for (let i = 0; i < 3; i++) {
    [resX, resY] = multiplyComplexNumbers(resX, resY, resX, resY);
    [resX, resY] = devideComplexNumbers(resX, resY, 10, 10);
    [resX, resY] = AddComplexNumbers(complexX, complexY, resX, resY);
  }

  return `[${resX},${resY}]`;
}
