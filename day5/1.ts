import { readFileSync } from 'fs';
import { question } from 'readline-sync';

function getProgram(path: string): number[] {
  return readFileSync(path, { encoding: 'utf-8' }).split(',').map((value) => parseInt(value));
}

function getValue(program: number[], paramIndex: number, paramMode: string) {
  const parameter = program[paramIndex];
  // console.log(`Index: ${paramIndex}, param: ${parameter}, mode: ${paramMode}`);

  if (paramMode === '0') {
    return program[parameter];
  } else if (paramMode === '1') {
    return parameter;
  }

  throw new Error(`Invalid parameter mode ${paramMode}`);
}

function intcode(program: number[], cursor = 0): void {
  const instruction = program[cursor].toString();
  // console.log(`Cursor: ${cursor}, Instruction: ${instruction}`);
  const l = instruction.length;
  const opcode = parseInt(instruction.substring(l - 2));

  if (opcode === 99) {
    return;
  }

  const param1Mode = l > 2 ? instruction[l - 3] : '0';
  const param2Mode = l > 3 ? instruction[l - 4] : '0';
  // const param3Mode = l > 4 ? instruction[l - 5] : '0';
  let next: number;

  if (opcode === 1) {
    const value1 = getValue(program, cursor + 1, param1Mode);
    const value2 = getValue(program, cursor + 2, param2Mode);
    const savePosition = program[cursor + 3];
    program[savePosition] = value1 + value2;
    next = cursor + 4;
  } else if (opcode === 2) {
    const value1 = getValue(program, cursor + 1, param1Mode);
    const value2 = getValue(program, cursor + 2, param2Mode);
    const savePosition = program[cursor + 3];
    program[savePosition] = value1 * value2;
    next = cursor + 4;
  } else if (opcode === 3) {
    const savePosition = program[cursor + 1];
    const userInput = question('Input: ');
    program[savePosition] = parseInt(userInput);
    next = cursor + 2;
  } else if (opcode === 4) {
    const value1 = getValue(program, cursor + 1, param1Mode);
    console.log(value1);
    next = cursor + 2;
  } else if (opcode === 5) {
    const value1 = getValue(program, cursor + 1, param1Mode);

    if (value1 !== 0) {
      const value2 = getValue(program, cursor + 2, param2Mode);
      next = value2;
    } else {
      next = cursor + 3;
    }
  } else if (opcode === 6) {
    const value1 = getValue(program, cursor + 1, param1Mode);

    if (value1 === 0) {
      const value2 = getValue(program, cursor + 2, param2Mode);
      next = value2;
    } else {
      next = cursor + 3;
    }
  } else if (opcode === 7) {
    const value1 = getValue(program, cursor + 1, param1Mode);
    const value2 = getValue(program, cursor + 2, param2Mode);
    const savePosition = program[cursor + 3];

    if (value1 < value2) {
      program[savePosition] = 1;
    } else {
      program[savePosition] = 0;
    }

    next = cursor + 4;
  } else if (opcode === 8) {
    const value1 = getValue(program, cursor + 1, param1Mode);
    const value2 = getValue(program, cursor + 2, param2Mode);
    const savePosition = program[cursor + 3];

    if (value1 === value2) {
      program[savePosition] = 1;
    } else {
      program[savePosition] = 0;
    }

    next = cursor + 4;
  } else {
    throw new Error(`Invalid opcode ${opcode}`);
  }

  intcode(program, next);
}

function main() {
  const program = getProgram('day5/input.txt');
  intcode(program);
}

main();
