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

const default_input = readFileSync('day2input.txt', {encoding: 'utf-8'}).split(',').map(n => parseInt(n));
const wanted = 19690720;
let noun = 0;
let found = false;

while (!found && noun <= 99) {
  let verb = 0;

  while (!found && verb <= 99) {
    const data = [...default_input];
    data[1] = noun;
    data[2] = verb;
    intcode(data);
    // console.log(`${noun} ${verb} ${data[0]}`);

    if (data[0] === wanted) {
      console.log(`Noun = ${noun}, verb = ${verb}`);
      console.log(100 * noun + verb);
      found = true;
    }

    verb += 1;
  }

  noun += 1;
}

if (!found) {
  console.log('Not found :(');
}

// intcode(input);

// console.log(input);
