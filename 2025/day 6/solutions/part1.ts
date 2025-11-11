export function part1(input: string): string {
  const soldiers = input.split("");
  const category = "a";

  const filteredSoldiers = soldiers.filter((soldier) => soldier.toLocaleLowerCase().includes(category));

  let combinations = 0;
  for (const [index, soldier] of filteredSoldiers.entries()) {
    if (soldier === category) {
      const soldiersBefore = filteredSoldiers.slice(0, index);
      combinations += soldiersBefore.filter((s) => s === category.toUpperCase()).length;
    }
  }

  return combinations.toString();
}
