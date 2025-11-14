export function part3(input: string): string {
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

  // Union-Find data structure to track families
  const parent = new Map<number, number>();
  const rank = new Map<number, number>();

  // Initialize each scale as its own parent
  for (const scale of scales) {
    parent.set(scale.id, scale.id);
    rank.set(scale.id, 0);
  }

  // Find with path compression
  function find(x: number): number {
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)!));
    }
    return parent.get(x)!;
  }

  // Union by rank
  function union(x: number, y: number): void {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    const rankX = rank.get(rootX)!;
    const rankY = rank.get(rootY)!;

    if (rankX < rankY) {
      parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      parent.set(rootY, rootX);
    } else {
      parent.set(rootY, rootX);
      rank.set(rootX, rankX + 1);
    }
  }

  // Find all parent-child relationships and unite them into families
  for (const child of scales) {
    for (let i = 0; i < scales.length; i++) {
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
            // Unite child with both parents into the same family
            union(child.id, p1.id);
            union(child.id, p2.id);
            break;
          }
        }
      }
    }
  }

  // Group scales by family
  const families = new Map<number, number[]>();
  for (const scale of scales) {
    const root = find(scale.id);
    if (!families.has(root)) {
      families.set(root, []);
    }
    families.get(root)!.push(scale.id);
  }

  // Find the largest family and sum its IDs
  let maxSum = 0;
  for (const family of families.values()) {
    const sum = family.reduce((acc, id) => acc + id, 0);
    if (family.length > 1 || families.size === scales.length) {
      // Consider families with more than 1 member, or all if no relationships found
      maxSum = Math.max(maxSum, sum);
    }
  }

  // If no families found, just return the largest single ID
  if (maxSum === 0) {
    maxSum = Math.max(...scales.map(s => s.id));
  }

  return String(maxSum);
}
