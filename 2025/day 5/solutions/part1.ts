export function part1(input: string): string {
  const [identifier, segments] = input.split(':');

  const segmentsList = segments.split(',').map((segment) => parseInt(segment, 10));

  type SpineSegment = {
    left?: number;
    center?: number;
    right?: number;
  };

  const fishBone: SpineSegment[] = [{}];

  for (const segment of segmentsList) {
    let placed = false;
    for (const branch of fishBone) {
      if (branch.center === undefined) {
        branch.center = segment;
        placed = true;
        break;
      }

      if (segment < branch.center && branch.left === undefined) {
        branch.left = segment;
        placed = true;
        break;
      }

      if (segment > branch.center && branch.right === undefined) {
        branch.right = segment;
        placed = true;
        break;
      }
    }

    if (!placed) {
      fishBone.push({ center: segment });
    }
  }
 
  const result = fishBone.map(s => s.center).join('');
  return `${result}`;
}







