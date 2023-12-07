/**
 Part 1
*/

interface Component {
	location: number;
	value: string;
}

interface ComponentMap {
	[key: number]: Component;
}

interface Engine {
	width: number;
	height: number;
	numbers: ComponentMap;
	symbols: ComponentMap;
}

const digitFinder = /\d+/g;
const symbolFinder = /[^\w\d\s\.]/g;

const parseSchematic = (input: string): Engine => {
	const lines = input.split('\n');
	const width = lines[0].length;
	lines.map((line, index) => {
		const numbers = Object.fromEntries(
			[...line.matchAll(digitFinder)].map((match) => [
				index * width + match.index,
				{ location: index * width + match.index, value: match[0] },
			]),
		);
	});
	lines.map((line, index) => {
		const symbols = Object.fromEntries(
			[...line.matchAll(symbolFinder)].map((match) => [
				match.index,
				{ location: match.index, value: match[0] },
			]),
		);
	});
	return {
		width: lines[0].length,
		height: lines.length,
		numbers,
		symbols,
	};
};

const range = (lower: number, len: number) =>
	Array.from({ length: len }, (x, i) => i + lower);

const getAdjacentLocations = (eng: Engine, comp: Component) => {
	const leftEdge = comp.location % eng.width === 0;
	const rightEdge = comp.location + (comp.value.length % eng.width) === 0;
	const topEdge = comp.location < eng.width;
	const bottomEdge = comp.location / eng.width - eng.height > -1;
	const adjacentLocs: number[] = [];
	if (!leftEdge) adjacentLocs.push(comp.location - 1);
	if (!rightEdge) adjacentLocs.push(comp.location + comp.value.length);
	if (!topEdge)
		adjacentLocs.push(
			...range(
				comp.location - eng.width - (leftEdge ? 0 : 1),
				comp.value.length + (leftEdge || rightEdge ? 1 : 2),
			),
		);
	if (!bottomEdge)
		adjacentLocs.push(
			...range(
				comp.location + eng.width - (leftEdge ? 0 : 1),
				comp.value.length + (leftEdge || rightEdge ? 1 : 2),
			),
		);
	return adjacentLocs;
};

const getAdjacentSymbols = (eng: Engine, comp: Component) => {
	const adjacents = getAdjacentLocations(eng, comp);
	console.log('Adjacent:', comp, adjacents);
	return adjacents
		.map((loc) => eng.symbols[loc])
		.filter((v) => v !== undefined);
};

export const part1 = (input: string) => {
	const engine = parseSchematic(input);
	console.log('Engine', engine);
	const engineParts = Object.entries(engine.numbers).map(([loc, comp]) => [
		loc,
		getAdjacentSymbols(engine, comp),
	]);
	console.log('Engine PArts', engineParts);
	return 42;
};
