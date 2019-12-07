import { readFileSync } from 'fs';

function parseInput(path: string): string[] {
  return readFileSync(path, {encoding: 'utf-8'}).split('\n');
}

function makeOrbitsMap(orbits: string[]): [Map<string, string>, Set<string>] {
  const orbitsMap = new Map<string, string>();
  const allObjects = new Set<string>();

  orbits.forEach((orbit) => {
    if (orbit) {
      const [left, right] = orbit.split(')');
      allObjects.add(left);
      allObjects.add(right);
      orbitsMap.set(right, left);
    }
  });

  return [orbitsMap, allObjects];
}

function getOrbitsCount(object: string, orbitsMap: Map<string, string>): number {
  const orbitting = orbitsMap.get(object);

  if (!orbitting) {
    return 0;
  }

  return 1 + getOrbitsCount(orbitting, orbitsMap);
}

function main() {
  const orbits = parseInput('day6/input.txt');
  const [orbitsMap, allObjects] = makeOrbitsMap(orbits);
  // console.log(orbitsMap);
  // console.log(allObjects);
  let total = 0;

  for (const object of allObjects) {
    total += getOrbitsCount(object, orbitsMap);
  }

  console.log(total);
}

main();
