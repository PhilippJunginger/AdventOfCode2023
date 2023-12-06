import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  console.log(data)
  return 0;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));