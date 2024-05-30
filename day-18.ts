// https://typehero.dev/challenge/day-18

type Count<Toy extends any[], Item, Result extends any[] = []> = Toy extends [
	infer First,
	...infer Rest,
]
	? First extends Item
		? Count<Rest, Item, [...Result, ""]>
		: Count<Rest, Item, Result>
	: Result["length"];
