import { readFileSync } from 'fs';

function intcode(program: number[], cursor = 0): void {
  const opcode = program[cursor];

  if (opcode === 99) {
    return;
  }

  const index1 = program[cursor + 1];
  const index2 = program[cursor + 2];
  const index3 = program[cursor + 3];

  const input1 = program[index1];
  const input2 = program[index2];
  let result: number;

  if (opcode === 1) {
    result = input1 + input2;
  } else if (opcode === 2) {
    result = input1 * input2;
  } else {
    throw new Error(`Invalid opcode ${opcode}`);
  }

  program[index3] = result;

  intcode(program, cursor + 4);
}

const input = readFileSync('day2input.txt', {encoding: 'utf-8'}).split(',').map(n => parseInt(n));

intcode(input);

console.log(input);
