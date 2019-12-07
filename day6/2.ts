import { readFileSync } from 'fs';

function createGraph(path: string): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();
  const lines = readFileSync(path, {encoding: 'utf-8'}).trim().split('\n');

  lines.forEach((line) => {
    const [left, right] = line.split(')');

    let leftSet = graph.get(left);
    if (!leftSet) {
      leftSet = new Set<string>();
      graph.set(left, leftSet);
    }
    leftSet.add(right);

    let rightSet = graph.get(right);
    if (!rightSet) {
      rightSet = new Set<string>();
      graph.set(right, rightSet);
    }
    rightSet.add(left);
  });

  return graph;
}

function bfs(graph: Map<string, Set<string>>, start: string, end: string): number {
  const queue: Array<[string, number]> = [];
  const visited = new Set<string>();
  let cur: string | null = start;
  let distance = 0;

  while (cur) {
    if (cur === end) {
      return distance;
    }

    const nodes = graph.get(cur);

    if (nodes) {
      for (const node of nodes) {
        if (!visited.has(node)) {
          queue.push([node, distance + 1]);
          visited.add(node);
        }
      }
    }

    const popped = queue.shift();

    if (popped) {
      cur = popped[0];
      distance = popped[1];
    } else {
      cur = null;
    }
  }

  return 0;
}

function main() {
  const graph = createGraph('day6/input.txt');
  const distance = bfs(graph, 'YOU', 'SAN');
  console.log(distance - 2);
}

main();
