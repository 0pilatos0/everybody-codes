export function part2(input: string): string {
  const soldiers = input.split("");
  const categories = Array.from(new Set(soldiers.map((s) => s.toLocaleLowerCase())));

  let totalCombinations = 0;

  for (const category of categories) {
    const filteredSoldiers = soldiers.filter((soldier) => soldier.toLocaleLowerCase().includes(category));

    let combinations = 0;
    for (const [index, soldier] of filteredSoldiers.entries()) {
      if (soldier === category) {
        const soldiersBefore = filteredSoldiers.slice(0, index);
        combinations += soldiersBefore.filter((s) => s === category.toUpperCase()).length;
      }
    }
    totalCombinations += combinations;
  }
  return totalCombinations.toString();
}
