import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

  const redCubesMax = 12;
  const greenCubesMax = 13;
  const blueCubesMax = 14;
  const totalCubes = redCubesMax + greenCubesMax + blueCubesMax;

  let result = 0;

  data.forEach(game => {
    if (!game.length) {
      return
    }

    const [gameString, setsString] = game.split(':');
    const gameNum = parseInt(gameString.split(' ')[1]);

    const sets = setsString.split(';');

    let red = 1;
    let blue = 1;
    let green = 1;

    sets.forEach((set, index) => {

      const dices = set.split(',');
      dices.forEach((dice) => {

        const diceTaken = parseInt(dice.split(' ')[1]);
        if (dice.includes('red') && diceTaken > red) {
          red = diceTaken;
        }
        if (dice.includes('green')&& diceTaken > green) {
          green = diceTaken;
        }
        if (dice.includes('blue')&& diceTaken > blue) {
          blue = diceTaken;
        }
      })
    })



    result += red * green * blue;
  })

  return result;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
