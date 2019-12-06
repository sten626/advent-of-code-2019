import { readFileSync } from 'fs';

function fuel(mass: number): number {
  const fuelForMass = Math.floor(mass / 3) - 2;
  
  if (fuelForMass <= 0) {
    return 0;
  }

  return fuelForMass + fuel(fuelForMass);
}

const lines = readFileSync('day1input.txt').toString().split('\n');
let sum = 0;

for (let line of lines) {
  sum += fuel(parseInt(line));
}

console.log(sum);
