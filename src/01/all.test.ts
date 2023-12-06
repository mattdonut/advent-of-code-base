import { part1 } from './part1';
import { part2 } from './part2';

const testCasesPt1: [Parameters<typeof part1>[0], ReturnType<typeof part1>][] =
	[
		[
			`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
			142,
		],
	];

describe('Day 1, part 1', () => {
	test.each(testCasesPt1)('Input: %s. Output: %s', (input, expected) => {
		expect(part1(input)).toBe(expected);
	});
});

const testCasesPt2: [Parameters<typeof part2>[0], ReturnType<typeof part2>][] =
	[
		[
			`two1nine
	eightwothree
	abcone2threexyz
	xtwone3four
	4nineeightseven2
	zoneight234
	7pqrstsixteen`,
			281,
		],
	];

describe('Day 1, part 2', () => {
	test.each(testCasesPt2)('Input: %s. Output: %s', (input, expected) => {
		expect(part2(input)).toBe(expected);
	});
});
