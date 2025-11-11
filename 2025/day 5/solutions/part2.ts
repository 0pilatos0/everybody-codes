export function part2(input: string): string {

  const lines = input.split('\n');
  const swords: { [key: string]: number } = {};


  for (const line of lines) {
    const [identifier, segments] = line.split(':');

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
    swords[identifier] = parseInt(result, 10);
  }

  //sort swords by value descending
  const sortedSwords = Object.entries(swords).sort((a, b) => b[1] - a[1]);

  //get difference between highest and lowest
  const difference = sortedSwords[0][1] - sortedSwords[sortedSwords.length - 1][1];

  return `${difference}`;
}







