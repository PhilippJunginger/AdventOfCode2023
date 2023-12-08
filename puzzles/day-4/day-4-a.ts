import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const scratchCards = await readData(dataPath);

  let totalPoints = 0;

  const extractNumbersFromString = (str: string): number[] => {
    return str.split(' ').filter(result => {
      if (!isNaN(parseInt(result))) {
        return parseInt(result);
      }
    }).map(res => parseInt(res));
  }

  scratchCards.forEach(scratchCard => {
    if (!scratchCard.length) {
      return;
    }

    const [, winningStr, availableStr] = scratchCard.split(/[:|]/);
    const [winning, available] = [extractNumbersFromString(winningStr), extractNumbersFromString(availableStr)]

    const amountOfWinners = winning.filter(winner => available.includes(winner)).length;

    if (amountOfWinners) {
      totalPoints += Math.pow(2, amountOfWinners - 1);
    }
  })

  return totalPoints;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
