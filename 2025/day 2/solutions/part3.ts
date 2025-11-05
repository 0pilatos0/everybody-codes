export function part3(input: string): string {
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

  // Loop for 1001x1001 grid (0 to 1000 inclusive)
  for (let i = 0; i <= 1000; i++) {
    for (let j = 0; j <= 1000; j++) {
      const x = a + i * 1;
      const y = b + j * 1;
      
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
