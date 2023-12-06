import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
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
    let isPossible = 0;



    sets.forEach(set => {
      let red = 0;
      let blue = 0;
      let green = 0;

      const dices = set.split(',');
      dices.forEach(dice => {

        const diceTaken = parseInt(dice.split(' ')[1]);
        if (dice.includes('red')) {
          red = diceTaken
        }
        if (dice.includes('green')) {
          green = diceTaken
        }
        if (dice.includes('blue')) {
          blue = diceTaken
        }
      })

      const grabbedTotal = red + green + blue;
      if (grabbedTotal <= totalCubes && red <= redCubesMax && green <= greenCubesMax && blue <= blueCubesMax) {
        isPossible++;
      }
    })

    if (isPossible === sets.length) {
      result += gameNum;
    }
  })

  return result;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
