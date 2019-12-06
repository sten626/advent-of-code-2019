function findPasswords(start: number, end: number): string[] {
  const passwords = [];

  for (let i = start; i <= end; i++) {
    const num = i.toString();
    let adjacent = false;
    let valid = true;

    for (let j = 1; j < num.length; j++) {
      if (num[j] < num[j - 1]) {
        valid = false;
        break;
      }

      if (num[j] === num[j - 1]) {
        adjacent = true;
      }
    }

    if (valid && adjacent) {
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
