// https://typehero.dev/challenge/day-12

type FindSanta<Array extends any[], Value extends any[] = []> = Array extends [infer First, ...infer Rest] 
	? First extends '🎅🏼'
		? Value['length']
		: FindSanta<Rest, [...Value, '']>
	: never;
