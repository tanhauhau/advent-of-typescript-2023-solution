// https://typehero.dev/challenge/day-9

type Reverse<Str extends string> = Str extends `${infer FirstChar}${infer Rest}`
	? `${Reverse<Rest>}${FirstChar}`
	: "";
