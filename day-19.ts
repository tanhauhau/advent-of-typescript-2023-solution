// https://typehero.dev/challenge/day-19

type CreateArray<Item, Length, Result extends any[] = []> = Result["length"] extends Length
	? Result
	: CreateArray<Item, Length, [...Result, Item]>;

type NextItem = {
	"🛹": "🚲";
	"🚲": "🛴";
	"🛴": "🏄";
	"🏄": "🛹";
};

type Rebuild<
	Array extends any[],
	Item extends keyof NextItem = "🛹",
	Result extends any[] = [],
> = Array extends [infer First, ...infer Rest]
	? Rebuild<Rest, NextItem[Item], [...Result, ...CreateArray<Item, First>]>
	: Result;
