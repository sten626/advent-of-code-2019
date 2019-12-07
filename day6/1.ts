import { readFileSync } from 'fs';

function parseInput(path: string): string[] {
  return readFileSync(path, {encoding: 'utf-8'}).split('\n');
}

function makeOrbitsMap(orbits: string[]): Map<string, Set<string>> {
  const orbitsMap = new Map<string, Set<string>>();

  orbits.forEach((orbit) => {
    if (orbit) {
      const [left, right] = orbit.split(')');
      let orbitSet = orbitsMap.get(left);

      if (!orbitSet) {
        orbitSet = new Set<string>();
        orbitsMap.set(left, orbitSet);
      }

      orbitSet.add(right);
    }
  });

  return orbitsMap;
}

function main() {
  const orbits = parseInput('day6/testinput.txt');
  const orbitsMap = makeOrbitsMap(orbits);
  console.log(orbitsMap);
}

main();
