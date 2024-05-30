// https://typehero.dev/challenge/day-16

type FindSanta<
	Map extends any[][],
	Col extends any[] = [],
	Row extends any[] = [],
> = Map[Col["length"]][Row["length"]] extends "🎅🏼"
	? [Col["length"], Row["length"]]
	: Row["length"] extends Map[0]["length"]
		? FindSanta<Map, [...Col, ""], []>
		: FindSanta<Map, Col, [...Row, ""]>;
