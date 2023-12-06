import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  const foundNumbers: number[] = []

  data.forEach(str => {
    if (str.length === 0) {
      return;
    }

    let indexFront = 0;
    let indexBack = 0;

    const numbersInString: [string, string] = ['', ''];

    while ((numbersInString[0] === '' || numbersInString[1] === '')) {
      const charFront = str[indexFront];
      const charBack = str[str.length - 1 - indexBack];

      const isCharFrontNumber = !isNaN(parseInt(charFront));
      const isCharBackNumber = !isNaN(parseInt(charBack));

      if (numbersInString[0] === '') {
        if (isCharFrontNumber) {
          numbersInString[0] = charFront
        } else {
          indexFront++;
        }
      }

      if (numbersInString[1] === '') {
        if (isCharBackNumber) {
          numbersInString[1] = charBack
        } else {
          indexBack++;
        }
      }
    }

    foundNumbers.push(parseInt(numbersInString[0] + numbersInString[1]));
  })

  return foundNumbers.reduce((acc, num) => acc + num, 0);
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
