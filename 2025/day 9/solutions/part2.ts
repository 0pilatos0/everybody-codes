export function part2(input: string): string {
  type Scale = {
    id: number;
    sequence: string[];
  };

  const scales = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(":"))
    .map(([id, seq]) => ({
      id: Number(id),
      sequence: seq.split(""),
    })) as Scale[];

  let totalSimilarity = 0;

  for (const child of scales) {
    let foundParents = false;
    for (let i = 0; i < scales.length && !foundParents; i++) {
      for (let j = i + 1; j < scales.length; j++) {
        const p1 = scales[i];
        const p2 = scales[j];

        if (p1.id === child.id || p2.id === child.id) continue;

        const isChild = child.sequence.every((sym, idx) => sym === p1.sequence[idx] || sym === p2.sequence[idx]);

        if (isChild) {
          let m1 = 0;
          let m2 = 0;
          for (let k = 0; k < child.sequence.length; k++) {
            if (child.sequence[k] === p1.sequence[k]) m1++;
            if (child.sequence[k] === p2.sequence[k]) m2++;
          }
          // Both parents must contribute (m1 > 0 and m2 > 0)
          if (m1 > 0 && m2 > 0) {
            totalSimilarity += m1 * m2;
            foundParents = true;
            break;
          }
        }
      }
    }
  }

  return String(totalSimilarity);
}
