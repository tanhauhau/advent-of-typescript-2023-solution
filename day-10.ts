// https://typehero.dev/challenge/day-10

type StreetSuffixTester<
	Str extends string,
	Suffix extends string,
> = Str extends `${string}${Suffix}` ? true : false;
