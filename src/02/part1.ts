/**
 Part 1
*/

export interface Reveal {
	red: number;
	green: number;
	blue: number;
}

export type Bag = Reveal;

export interface Game {
	reveals: Reveal[];
	id: number;
}

const partOneBag = {
	red: 12,
	green: 13,
	blue: 14,
};

const possible = (bag: Bag, reveal: Reveal) =>
	bag.red >= reveal.red && bag.green >= reveal.green && bag.blue >= reveal.blue;

export const parseReveal = (colorsString: string): Reveal => {
	const parts = colorsString.split(',').map((chunk) =>
		chunk
			.split(' ')
			.map((bit, index) => (index === 0 ? Number.parseInt(bit, 10) : bit))
			.reverse(),
	);
	return { red: 0, green: 0, blue: 0, ...Object.fromEntries(parts) };
};

export const parseGame = (line: string): Game | null => {
	const [gameString, revealString] = line.split(':');
	const idMatches = gameString.match(/\d+/);
	if (!idMatches) return null;
	const id = Number.parseInt(idMatches[0], 10);
	const reveals = revealString.split(';').map(parseReveal);
	return { id, reveals };
};

export const part1 = (input: string) => {
	const lines = input.split('\n');
	const games = lines.map(parseGame);
	const possibleGames = games.filter((game) =>
		game ? game.reveals.every((rev) => possible(partOneBag, rev)) : false,
	);
	return possibleGames
		.map((game) => game?.id)
		.reduce(
			(acc, current) =>
				current !== undefined && acc !== undefined ? acc + current : acc,
			0,
		);
};
