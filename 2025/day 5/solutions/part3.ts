export function part3(input: string): string {
   type SpineSegment = {
      left?: number;
      center?: number;
      right?: number;
    };

  const lines = input.split('\n');

  type FishBone = SpineSegment[];

  const swords: { [key: string]: FishBone } = {};


  for (const line of lines) {
    const [identifier, segments] = line.split(':');

    const segmentsList = segments.split(',').map((segment) => parseInt(segment, 10));

 

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

    swords[identifier] = fishBone;
  }

  // Function to calculate the quality score of a fish bone
  const calculateQualityScore = (fishBone: FishBone): number => {
    return parseInt(fishBone.map(segment => segment.center).join(''), 10);
  };

  // Function to compare two swords
  const compareSwords = (a: [string, FishBone], b: [string, FishBone]): number => {
    const qualityA = calculateQualityScore(a[1]);
    const qualityB = calculateQualityScore(b[1]);

    if (qualityA !== qualityB) {
      return qualityB - qualityA; // Higher quality score is better
    }

    // If quality scores are the same, compare levels
    for (let i = 0; i < Math.max(a[1].length, b[1].length); i++) {
      const levelA = a[1][i] ? (a[1][i].left || 0) + (a[1][i].center || 0) + (a[1][i].right || 0) : 0;
      const levelB = b[1][i] ? (b[1][i].left || 0) + (b[1][i].center || 0) + (b[1][i].right || 0) : 0;

      if (levelA !== levelB) {
        return levelB - levelA; // Higher level score is better
      }
    }

    // If all levels are the same, compare identifiers
    return parseInt(b[0]) - parseInt(a[0]); // Higher identifier is better
  };

  // Sort swords by value according to the defined rules
  const sortedSwords = Object.entries(swords).sort(compareSwords);

  // Calculate checksum
  const checksum = sortedSwords.reduce((sum, [identifier], index) => {
    return sum + (parseInt(identifier) * (index + 1));
  }, 0);

  return `${checksum}`;

}







