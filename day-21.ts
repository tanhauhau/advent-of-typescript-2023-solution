// https://typehero.dev/challenge/day-21

type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type Position = {
	top: "0";
	middle: "1";
	bottom: "2";
	left: "0";
	center: "1";
	right: "2";
};

type MapArray<
	Row extends TicTactToeBoard[number],
	X extends TicTacToeXPositions,
	Chip extends TicTacToeChip,
> = {
	[Index in keyof Row]: Index extends Position[X]
		? Row[Index] extends TicTacToeEmptyCell
			? Chip
			: "Invalid"
		: Row[Index];
};

type NextBoard<
	Board extends TicTactToeBoard,
	Move extends TicTacToePositions,
	Chip extends TicTacToeChip,
> = Move extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
	? {
			[Index in keyof Board]: Index extends Position[Y]
				? MapArray<Board[Index], X, Chip>
				: Board[Index];
		}
	: Board;

type TicTacToe<Game extends TicTacToeGame, Move extends TicTacToePositions> = Game extends {
	board: infer Board extends TicTactToeBoard;
	state: infer State extends TicTacToeChip;
}
	? NextBoard<Board, Move, State> extends infer Next extends any[][]
		? "Invalid" extends Next[number][number]
			? Game
			: {
					board: Next;
					state: EndState<Next> extends never ? (State extends "❌" ? "⭕" : "❌") : EndState<Next>;
				}
		: never
	: never;

type Win<Row extends [any, any, any]> = Row extends ["⭕", "⭕", "⭕"]
	? "⭕ Won"
	: Row extends ["❌", "❌", "❌"]
		? "❌ Won"
		: never;

type EndState<Board extends any[][]> = TicTacToeEmptyCell extends Board[number][number]
	?
			| Win<[Board[0][0], Board[0][1], Board[0][2]]>
			| Win<[Board[1][0], Board[1][1], Board[1][2]]>
			| Win<[Board[2][0], Board[2][1], Board[2][2]]>
			| Win<[Board[0][0], Board[1][0], Board[2][0]]>
			| Win<[Board[0][1], Board[1][1], Board[2][1]]>
			| Win<[Board[0][2], Board[1][2], Board[2][2]]>
			| Win<[Board[0][0], Board[1][1], Board[2][2]]>
			| Win<[Board[0][2], Board[1][1], Board[2][0]]>
	: "Draw";
