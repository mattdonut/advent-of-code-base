/**
 Part 1
*/
type DigitFinder = (input: string) => string;

export function numberMaker(
	input: string,
	firstFinder: DigitFinder,
	lastFinder: DigitFinder,
) {
	const lines = input.split('\n');
	const calibrations = lines.map((line) => {
		console.log('Debug:', line, firstFinder(line), lastFinder(line));
		return Number.parseInt(firstFinder(line) + lastFinder(line), 10);
	});
	return calibrations.reduce((acc, val) => acc + val, 0);
}
const digitFinder = /\d/g;

const firstDigit = (input: string) => {
	const bits = input.match(digitFinder);
	return bits ? bits[0] : '0';
};

const lastDigit = (input: string) => {
	const bits = input.match(digitFinder);
	const lastBit = bits ? bits.at(-1) : '0';
	return lastBit || '0';
};

export const part1 = (input: string) =>
	numberMaker(input, firstDigit, lastDigit);
