import { readFileSync } from 'fs';

function fuel(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

const lines = readFileSync('day1input.txt').toString().split('\n');
let sum = 0;

for (let line of lines) {
  sum += fuel(parseInt(line));
}

console.log(sum);
