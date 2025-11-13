export function part3(input: string): string {
  const NAILS = 256;
  const instructions = input
    .split(/[\s,]+/)
    .map((token) => parseInt(token, 10))
    .filter((num) => Number.isFinite(num));

  if (instructions.length < 2) {
    return "0";
  }

  const segments: Array<[number, number]> = [];

  for (let i = 0; i < instructions.length - 1; i++) {
    const from = instructions[i];
    const to = instructions[i + 1];

    if (from === to) {
      continue;
    }

    const min = Math.min(from, to);
    const max = Math.max(from, to);
    segments.push([min, max]);
  }

  let bestStrike = 0;

  for (let nailA = 1; nailA <= NAILS; nailA++) {
    for (let nailB = nailA + 1; nailB <= NAILS; nailB++) {
      let cuts = 0;

      for (const [segA, segB] of segments) {
        if (segA === nailA && segB === nailB) {
          cuts++;
          continue;
        }

        if (doSegmentsIntersect(nailA, nailB, segA, segB, NAILS)) {
          cuts++;
        }
      }

      if (cuts > bestStrike) {
        bestStrike = cuts;
      }
    }
  }

  return bestStrike.toString();
}

function doSegmentsIntersect(a1: number, a2: number, b1: number, b2: number, nails: number): boolean {
  // Normalize segments so a1 < a2 and b1 < b2
  if (a1 > a2) [a1, a2] = [a2, a1];
  if (b1 > b2) [b1, b2] = [b2, b1];

  // Check if segments share an endpoint
  if (a1 === b1 || a1 === b2 || a2 === b1 || a2 === b2) {
    return false;
  }

  // Check if one segment's interior contains the other segment's endpoint
  // For a circular arrangement, segment (a1, a2) contains points a1+1, a1+2, ..., a2-1
  const aContainsB1 = a1 < b1 && b1 < a2;
  const aContainsB2 = a1 < b2 && b2 < a2;
  const bContainsA1 = b1 < a1 && a1 < b2;
  const bContainsA2 = b1 < a2 && a2 < b2;

  // Segments intersect if one contains exactly one endpoint of the other
  return (aContainsB1 && !aContainsB2) || (!aContainsB1 && aContainsB2) || (bContainsA1 && !bContainsA2) || (!bContainsA1 && bContainsA2);
}
