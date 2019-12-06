import { readFileSync } from 'fs';

enum Direction {
  Up,
  Down,
  Left,
  Right
}

interface Instruction {
  direction: Direction;
  distance: number;
}

interface Wire {
  instructions: Instruction[];
}

function parseInput(path: string): Wire[] {
  const result: Wire[] = [];
  const lines = readFileSync(path, {encoding: 'utf-8'}).split('\n');

  for (const line of lines) {
    const strings = line.split(',');
    const instructions: Instruction[] = strings.map((s) => {
      let direction: Direction;

      switch (s.substring(0, 1)) {
        case 'U':
          direction = Direction.Up;
          break;
        case 'D':
          direction = Direction.Down;
          break;
        case 'L':
          direction = Direction.Left;
          break;
        case 'R':
          direction = Direction.Right;
          break;
        default:
          console.log('Could not parse direction!');
          throw new Error();
      }
      return {
        direction,
        distance: parseInt(s.substring(1))
      };
    });

    result.push({instructions});
  }

  return result;
}

function generateWireLocationsMap(wire: Wire): Map<number, Set<number>> {
  const wireLocations: Map<number, Set<number>> = new Map<number, Set<number>>();

  let x = 0;
  let y = 0;

  wire.instructions.forEach((instruction) => {
    let distance = instruction.distance;

    switch (instruction.direction) {
      case Direction.Up: {
        console.log(`Going U${distance}`);
        let locations = wireLocations.get(x);

        if (!locations) {
          locations = new Set();
          wireLocations.set(x, locations);
        }

        while (distance > 0) {
          y += 1;
          distance -= 1;
          locations.add(y);
        }

        break;
      }
      case Direction.Down: {
        console.log(`Going D${distance}`);
        let locations = wireLocations.get(x);

        if (!locations) {
          locations = new Set();
          wireLocations.set(x, locations);
        }

        while (distance > 0) {
          y -= 1;
          distance -= 1;
          locations.add(y);
        }
        break;
      }
      case Direction.Left: {
        console.log(`Going L${distance}`);
        while (distance > 0) {
          x -= 1;
          distance -= 1;

          let locations = wireLocations.get(x);

          if (!locations) {
            locations = new Set();
            wireLocations.set(x, locations);
          }

          locations.add(y);
        }
        break;
      }
      case Direction.Right: {
        console.log(`Going R${distance}`);
        while (distance > 0) {
          x += 1;
          distance -= 1;

          let locations = wireLocations.get(x);

          if (!locations) {
            locations = new Set();
            wireLocations.set(x, locations);
          }

          locations.add(y);
        }
        break;
      }
    }
    console.log(`We're at [${x}, ${y}]`);
  });

  return wireLocations;
}

function findIntersections(wires: Wire[]): Array<[number, number]> {
  const wireLocations: Array<Map<number, Set<number>>> = [];
  const intersections: Array<[number, number]> = [];

  wires.forEach((wire) => {
    wireLocations.push(generateWireLocationsMap(wire));
  });

  const wire1Locations = wireLocations[0];
  const wire2Locations = wireLocations[1];

  for (const [x, ys] of wire2Locations) {
    const wire1Ys = wire1Locations.get(x);

    if (wire1Ys) {
      for (const y of ys) {
        if (wire1Ys.has(y)) {
          intersections.push([x, y]);
        }
      }
    }
  }

  return intersections;
}

function getMinDistance(intersections: Array<[number, number]>): number {
  let minDistance = Number.MAX_SAFE_INTEGER;

  intersections.forEach((intersection) => {
    const distance = Math.abs(intersection[0]) + Math.abs(intersection[1]);

    if (minDistance) {
      minDistance = Math.min(minDistance, distance);
    } else {
      minDistance = distance;
    }
  });

  return minDistance;
}

function main() {
  const wires = parseInput('./input.txt');
  const intersections = findIntersections(wires);
  const minDistance = getMinDistance(intersections);
  console.log(`${minDistance}`);
}

main();
