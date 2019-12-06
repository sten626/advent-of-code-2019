function findPasswords(start: number, end: number): string[] {
  const passwords = [];

  for (let i = start; i <= end; i++) {
    const num = i.toString();
    let valid = true;
    const groups: string[][] = [];
    let currentGroup: string[] = [num[0]];

    for (let j = 1; j < num.length; j++) {
      if (num[j] < num[j - 1]) {
        valid = false;
        break;
      }

      if (currentGroup.length === 0 || currentGroup[0] === num[j]) {
        currentGroup.push(num[j]);
      } else {
        groups.push(currentGroup);
        currentGroup = [num[j]];
      }
    }

    groups.push(currentGroup);

    if (!valid) {
      continue;
    }

    let hasAdjacent = false;

    for (const group of groups) {
      if (group.length === 2) {
        hasAdjacent = true;
        break;
      }
    }

    if (hasAdjacent) {
      passwords.push(num);
    }
  }

  return passwords;
}

function main(start: number, end: number) {
  const passwords = findPasswords(start, end);
  console.log(passwords.length);
}

main(134792, 675810);
