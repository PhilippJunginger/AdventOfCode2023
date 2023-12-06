import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  const foundNumbers: number[] = []

  const numberLiterals = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  data.forEach(str => {
    if (str.length === 0) {
      return;
    }

    const numbersInString: [string, string] = ['', ''];

    let indexFront = 0;
    let indexBack = 0;
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

    function checkForIndexes() {

    }

    foundNumbers.push(parseInt(numbersInString[0] + numbersInString[1]));
  })

  return foundNumbers.reduce((acc, num) => acc + num, 0);
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
