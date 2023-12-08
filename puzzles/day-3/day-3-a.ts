import { readData } from '../../shared.ts';
import chalk from 'chalk';

type FoundNumber = {
  value: number;
  start: number;
  end: number;
  line: number;
}

type Symbol = {
  index: number,
  line: number,
}

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);

  const foundNumbers: FoundNumber[] = [];
  const foundSymbols: Symbol[] = []

  const matchSymbolsRegExp = /[^0-9.]/

  const numbersInDataString = (str: string, line: number) => {
    let i = 0;
    while(i < str.length) {
      const char = str[i];
      const isNumber = !isNaN(parseInt(char));

      if (isNumber) {
        let currentNumString = str[i];
        let j = i + 1;

        while (!isNaN(parseInt(str[j])) && str[i] !== '.') {
          currentNumString += str[j];
          j++;
        }

        console.log(currentNumString, i, j)
        foundNumbers.push({
          value: parseInt(currentNumString),
          start: i > 0 ? i - 1 : i,
          end: j,
          line,
        })
        i = j;
      } else {
        i++;
      }
    }
  }

  const symbolsInDataString = (str: string, line: number) => {
    for (let i = 0; i < str.length; i++) {
      const isSymbol = matchSymbolsRegExp.test(str[i]);
      if (isSymbol) {
        foundSymbols.push({
          index: i,
          line
        })
      }
    }
  }

  data.forEach((str, index) => {
    numbersInDataString(str, index);
    symbolsInDataString(str, index);
  });


  const checkSymbols = (num: FoundNumber): boolean => {
    return !!foundSymbols.find(symbol => {
      const matchesIndex = symbol.index >= num.start && symbol.index <= num.end;
      const matchesLine = symbol.line + 1 === num.line || symbol.line - 1 === num.line || symbol.line === num.line;

      return matchesIndex && matchesLine;
    })
  }

  const result = foundNumbers.map((num, currentLineIndex) => {
    return checkSymbols(num) ? num.value : 0;
  })

  return result.reduce((acc, num) => acc + num, 0);
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
