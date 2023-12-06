/**
 Part 2
*/
import { Bag, Game, parseGame } from './part1';

const cubesForGame = (game: Game): Bag => {
	const reds = game.reveals.map((g) => g.red);
	const greens = game.reveals.map((g) => g.green);
	const blues = game.reveals.map((g) => g.blue);
	return {
		red: Math.max(...reds),
		green: Math.max(...greens),
		blue: Math.max(...blues),
	};
};

const powerForBag = (bag: Bag): number => bag.red * bag.green * bag.blue;

const powerForGame = (game: Game): number => powerForBag(cubesForGame(game));

export const part2 = (input: string) => {
	const lines = input.split('\n');
	const games = lines.map(parseGame).filter(Boolean) as Game[];
	const powers = games.map(powerForGame);
	return powers.reduce((a, b) => a + b, 0);
};
