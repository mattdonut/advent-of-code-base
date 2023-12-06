/**
 Part 2
*/
import { part1, numberMaker } from './part1';

const numberWord = /eight|one|two|three|four|five|six|seven|nine/g;
const reverseDigit = /enin|neves|xis|evif|ruof|eerht|owt|eno|thgie/g;
const brokenWords =
	/oneight|eighthree|eightwo|threeight|fiveight|sevenine|nineight|twone/g;
const digitFinder = /eight|one|two|three|four|five|six|seven|nine|\d/g;

interface Map {
	[key: string]: string;
}

const numberLookup = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
} as Map;

const reverseLookup = {
	enin: '9',
	neves: '7',
	xis: '6',
	evif: '5',
	ruof: '4',
	eerht: '3',
	owt: '2',
	eno: '1',
	thgie: '8',
} as Map;

const brokenLookup = {
	oneight: '18',
	twone: '21',
	eighthree: '83',
	eightwo: '82',
	threeight: '38',
	fiveight: '58',
	sevenine: '79',
	nineight: '98',
} as Map;

const reverse = (list: string) => [...list].reverse().join('');

const firstDigit = (input: string) => {
	const fixed = input.replaceAll(numberWord, (num) => numberLookup[num]);
	const bits = fixed.match(digitFinder);
	return bits ? bits[0] : '0';
};

const lastDigit = (input: string) => {
	const reversed = reverse(input);
	console.log('Reversed:', reversed);
	const revFixed = reversed.replaceAll(
		reverseDigit,
		(num) => reverseLookup[num],
	);
	console.log('RevFixed', revFixed);
	const revBits = revFixed.match(digitFinder);
	const revLast = revBits ? revBits[0] : '0';
	const broken = input.replaceAll(brokenWords, (num) => brokenLookup[num]);
	const fixed = broken.replaceAll(numberWord, (num) => numberLookup[num]);
	const bits = fixed.match(digitFinder);
	const lastBit = bits ? bits.at(-1) : '0';
	if (revLast !== lastBit) {
		console.warn('Methods differ!!', revLast, lastBit);
	}
	return lastBit || '0';
};

export const part2 = (input: string) =>
	numberMaker(input, firstDigit, lastDigit);
