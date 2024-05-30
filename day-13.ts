// https://typehero.dev/challenge/day-13

type CreateArray<Len extends number, Result extends any[] = []> = Result["length"] extends Len
	? Result[number]
	: CreateArray<Len, [...Result, Result["length"]]>;

type DayCounter<Start extends number, End extends number> =
	| Exclude<CreateArray<End>, CreateArray<Start>>
	| End;
