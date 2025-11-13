export function part2(input: string): string {
  const NAILS = 8;
  const instructions = input.split(",").map((num) => parseInt(num.trim(), 10));

  let knots = 0;

  // count the number of times an instruction crosses any other instructions

  const segments: Array<[number, number]> = [];

  for (let i = 0; i < instructions.length - 1; i++) {
    const from = instructions[i];
    const to = instructions[i + 1];

    // Count intersections with all previous segments
    for (const [prevFrom, prevTo] of segments) {
      if (doSegmentsIntersect(from, to, prevFrom, prevTo, NAILS)) {
        knots++;
      }
    }

    segments.push([from, to]);
  }

  return knots.toString();
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
