import { readData } from '../../shared.ts';
import chalk from 'chalk';

type FoundNumber = {
  value: number;
  start: number;
  end: number;
  line: number;
}

type GearSymbol = {
  index: number,
  line: number,
}

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);


  const foundNumbers: FoundNumber[] = [];
  const foundSymbols: GearSymbol[] = []

  const matchSymbolsRegExp = /[*]/

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

  const checkNumbers = (symbol: GearSymbol): number[]  => {
    const result = foundNumbers.filter(( num) => {
      const matchesIndex = symbol.index >= num.start && symbol.index <= num.end;
      const matchesLine = symbol.line + 1 === num.line || symbol.line - 1 === num.line || symbol.line === num.line;
      return matchesIndex && matchesLine;
    })

    if (result.length < 2) {
      return [];
    }
    return result.map(res => res.value);
  }

  const result = foundSymbols.map((symbol, currentLineIndex) => {
    return checkNumbers(symbol);
  })



  return result.reduce((acc, num) => {
    if (num.length) {
      acc += num.reduce((accNum, num2) => accNum * num2, 1);
    }
    return acc;
  }, 0);
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
