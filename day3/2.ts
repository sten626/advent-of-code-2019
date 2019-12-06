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

function generateWireLocationsMap(wire: Wire): Map<number, Map<number, number>> {
  const wireLocations = new Map<number, Map<number, number>>();

  let x = 0;
  let y = 0;
  let totalDistance = 0;

  wire.instructions.forEach((instruction) => {
    let distance = instruction.distance;

    switch (instruction.direction) {
      case Direction.Up: {
        console.log(`Going U${distance}`);
        let yToDistance = wireLocations.get(x);

        if (!yToDistance) {
          yToDistance = new Map();
          wireLocations.set(x, yToDistance);
        }

        while (distance > 0) {
          y += 1;
          distance -= 1;
          totalDistance += 1;

          if (!yToDistance.has(y)) {
            yToDistance.set(y, totalDistance);
          }
        }

        break;
      }
      case Direction.Down: {
        console.log(`Going D${distance}`);
        let yToDistance = wireLocations.get(x);

        if (!yToDistance) {
          yToDistance = new Map();
          wireLocations.set(x, yToDistance);
        }

        while (distance > 0) {
          y -= 1;
          distance -= 1;
          totalDistance += 1;

          if (!yToDistance.has(y)) {
            yToDistance.set(y, totalDistance);
          }
        }
        break;
      }
      case Direction.Left: {
        console.log(`Going L${distance}`);
        while (distance > 0) {
          x -= 1;
          distance -= 1;
          totalDistance += 1;

          let yToDistance = wireLocations.get(x);

          if (!yToDistance) {
            yToDistance = new Map();
            wireLocations.set(x, yToDistance);
          }

          if (!yToDistance.has(y)) {
            yToDistance.set(y, totalDistance);
          }
        }
        break;
      }
      case Direction.Right: {
        console.log(`Going R${distance}`);
        while (distance > 0) {
          x += 1;
          distance -= 1;
          totalDistance += 1;

          let yToDistance = wireLocations.get(x);

          if (!yToDistance) {
            yToDistance = new Map();
            wireLocations.set(x, yToDistance);
          }

          if (!yToDistance.has(y)) {
            yToDistance.set(y, totalDistance);
          }
        }
        break;
      }
    }
    console.log(`We're at [${x}, ${y}]`);
  });

  return wireLocations;
}

function findIntersection(wires: Wire[]): [number, number, number] {
  const wireLocations: Array<Map<number, Map<number, number>>> = [];
  let intersection: [number, number] = [0, 0];
  let minDistance: number = Number.MAX_SAFE_INTEGER;

  wires.forEach((wire) => {
    wireLocations.push(generateWireLocationsMap(wire));
  });

  const wire1XToYMap = wireLocations[0];
  const wire2XToYMap = wireLocations[1];

  for (const [x1, yToDistanceMap1] of wire1XToYMap) {
    const yToDistanceMap2 = wire2XToYMap.get(x1);

    if (!yToDistanceMap2) {
      continue;
    }

    for (const [y1, distance1] of yToDistanceMap1) {
      const distance2 = yToDistanceMap2.get(y1);

      if (distance2) {
        const distance = distance1 + distance2;

        if (distance < minDistance) {
          minDistance = distance;
          intersection = [x1, y1];
        }
      }
    }
  }

  return [intersection[0], intersection[1], minDistance];
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
  const [x, y, distance] = findIntersection(wires);
  // const minDistance = getMinDistance(intersections);
  console.log(`${distance}`);
}

main();
