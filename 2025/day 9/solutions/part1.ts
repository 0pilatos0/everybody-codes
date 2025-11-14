export function part1(input: string): string {
  type Scale = {
    id: number;
    sequence: string[];
  };

  const scales = input
    .split("\r\n")
    .map((line) => line.split(":"))
    .map(([id, seq]) => ({
      id: Number(id),
      sequence: seq.split(""),
    })) as Scale[];

  const [s1, s2, s3] = scales;

  const candidates = [
    { child: s1, parents: [s2, s3] },
    { child: s2, parents: [s1, s3] },
    { child: s3, parents: [s1, s2] },
  ];

  const found = candidates.find(({ child, parents }) =>
    child.sequence.every((sym, i) => sym === parents[0].sequence[i] || sym === parents[1].sequence[i])
  );

  if (!found) return "0";

  const {
    child: c,
    parents: [p1, p2],
  } = found;

  let m1 = 0;
  let m2 = 0;
  for (let i = 0; i < c.sequence.length; i++) {
    if (c.sequence[i] === p1.sequence[i]) m1++;
    if (c.sequence[i] === p2.sequence[i]) m2++;
  }

  return String(m1 * m2);
}
