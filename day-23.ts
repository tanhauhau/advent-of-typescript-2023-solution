// https://typehero.dev/challenge/day-23

type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type EmptyBoard = [
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type NewGame = {
	board: EmptyBoard;
	state: "🟡";
};

type Connect4<Game, Column extends number> = Game extends {
	board: infer Board extends any[][];
	state: infer State extends Connect4Chips;
}
	? NextBoard<Board, State, Column> extends infer Next extends any[][]
		? {
				board: Next;
				state: EndState<Next> extends never ? (State extends "🟡" ? "🔴" : "🟡") : EndState<Next>;
			}
		: never
	: never;

type NextBoard<
	Board extends any[][],
	Chip extends Connect4Chips,
	Column extends number,
	Rows extends any[][] = [],
> = Board extends [...infer Rest extends any[][], infer LastRow extends any[]]
	? LastRow[Column] extends "  "
		? [...Rest, PutChipHere<LastRow, Chip, Column>, ...Rows]
		: NextBoard<Rest, Chip, Column, [LastRow, ...Rows]>
	: never;
type PutChipHere<Row extends any[], Chip extends Connect4Chips, Column extends number> = {
	[Key in keyof Row]: Key extends `${Column}` ? Chip : Row[Key];
};

type Winner<Str> = Str extends `${string}🔴🔴🔴🔴${string}`
	? "🔴 Won"
	: Str extends `${string}🟡🟡🟡🟡${string}`
		? "🟡 Won"
		: never;

type EndState<Board extends any[][]> = "  " extends Board[number][number]
	?
			| Winner<GetRows<Board>>
			| Winner<GetCols<Board>>
			| Winner<GetRDiags<Board>>
			| Winner<GetLDiags<Board>>
	: "Draw";

type GetRow<Arr extends any[], Result extends string = ""> = Arr extends [
	infer First extends string,
	...infer Rest,
]
	? GetRow<Rest, `${Result}${First}`>
	: Result;

type b = GetRow<["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]>;
type GetRows<Board extends any[][], Result = never> = Board extends [
	infer FirstRow extends any[],
	...infer Rest extends any[][],
]
	? GetRows<Rest, GetRow<FirstRow> | Result>
	: Result;

type GetCol<Board extends any[][], Col extends number, Result extends string = ""> = Board extends [
	infer FirstRow extends string[],
	...infer Rest extends any[][],
]
	? GetCol<Rest, Col, `${Result}${FirstRow[Col]}`>
	: Result;
type GetCols<
	Board extends any[][],
	Result extends any[] = [],
> = Result["length"] extends Board[0]["length"]
	? Result[number]
	: GetCols<Board, [...Result, GetCol<Board, Result["length"]>]>;

type GetRDiag<
	Board extends any[][],
	Row extends number,
	Col extends number,
	Result extends string = "",
> = Row extends 0
	? `${Result}${Board[Row][Col]}`
	: Col extends Board[0]["length"]
		? Result
		: GetRDiag<Board, Dec<Row>, Inc<Col>, `${Result}${Board[Row][Col]}`>;

type GetLDiag<
	Board extends any[][],
	Row extends number,
	Col extends number,
	Result extends string = "",
> = Row extends 0
	? `${Result}${Board[Row][Col]}`
	: Col extends 0
		? `${Result}${Board[Row][Col]}`
		: GetLDiag<Board, Dec<Row>, Dec<Col>, `${Result}${Board[Row][Col]}`>;
type GetLDiags<
	Board extends any[][],
	Row extends number = Dec<Board["length"]>,
	Col extends number = 0,
	Result extends any = never,
> = Col extends Dec<Board[0]["length"]>
	? Row extends -1
		? Result
		: GetLDiags<Board, Dec<Row>, Col, Result | GetLDiag<Board, Row, Col>>
	: GetLDiags<Board, Row, Inc<Col>, Result | GetLDiag<Board, Row, Col>>;

type GetRDiags<
	Board extends any[][],
	Row extends number = 0,
	Col extends number = 0,
	Result extends any = never,
> = Row extends Dec<Board["length"]>
	? Col extends Board[0]["length"]
		? Result
		: GetRDiags<Board, Row, Inc<Col>, Result | GetRDiag<Board, Row, Col>>
	: GetRDiags<Board, Inc<Row>, Col, Result | GetRDiag<Board, Row, Col>>;

type ArrLen<V extends number, Result extends any[] = []> = Result["length"] extends V
	? Result
	: ArrLen<V, [...Result, ""]>;
type Inc<V extends number> = ["", ...ArrLen<V>]["length"] extends infer NewValue extends number
	? NewValue
	: never;
type Dec<V extends number> = ArrLen<V> extends ["", ...infer Rest] ? Rest["length"] : -1;

type a = EndState<
	[
		["  ", "  ", "  ", "  ", "  ", "  ", "  "],
		["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
		["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "],
		["🔴", "🟡", "🔴", "🟡", "🔴", "  ", "  "],
		["🟡", "🔴", "🟡", "🔴", "🔴", "  ", "  "],
		["🔴", "🟡", "🟡", "🔴", "🟡", "  ", "  "],
	]
>;
