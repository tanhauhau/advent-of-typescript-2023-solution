// https://typehero.dev/challenge/day-14

type DecipherNaughtyList<Str extends string> = Str extends `${infer Name}/${infer Rest}`
	? DecipherNaughtyList<Rest> | Name
	: Str;
