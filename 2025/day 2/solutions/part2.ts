export function part2(input: string): string {
  const startingPoint = input.split("=")[1].replace("[", "").replace("]", "").split(",");
  const a = parseInt(startingPoint[0], 10);
  const b = parseInt(startingPoint[1], 10);

  let engravedPoint = 0;

  function AddComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
    return [complexX + resultX, complexY + resultY];
  }

  function multiplyComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
    return [complexX * resultX - complexY * resultY, complexX * resultY + complexY * resultX];
  }

  function divideComplexNumbers(complexX: number, complexY: number): [number, number] {
    return [Math.trunc(complexX / 100000), Math.trunc(complexY / 100000)];
  }

  // Loop for 101x101 grid (0 to 100 inclusive)
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      const x = a + i * 10;
      const y = b + j * 10;
      
      let [resX, resY] = [0, 0];

      let shouldEngrave = true;
      for (let cycle = 0; cycle < 100; cycle++) {
        [resX, resY] = multiplyComplexNumbers(resX, resY, resX, resY);
        [resX, resY] = divideComplexNumbers(resX, resY);
        [resX, resY] = AddComplexNumbers(x, y, resX, resY);
        
        if (resX > 1000000 || resX < -1000000 || resY > 1000000 || resY < -1000000) {
          shouldEngrave = false;
          break;
        }
      }
      
      if (shouldEngrave) engravedPoint++;
    }
  }

  return engravedPoint.toString();
}
