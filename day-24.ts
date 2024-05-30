// https://typehero.dev/challenge/day-24

type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type FindPositionRow<Maze extends MazeMatrix[0]> = {
	[Key in keyof Maze]: Maze[Key] extends "🎅"
		? Key extends `${infer X extends number}`
			? X
			: never
		: never;
}[number];

type FindPosition<Maze extends MazeMatrix> = {
	[Key in keyof Maze]: "🎅" extends Maze[Key][number]
		? Key extends `${infer Y extends number}`
			? [FindPositionRow<Maze[Y]>, Y]
			: never
		: never;
}[number];

type FindNextPosition<
	CurrentPosition extends [number, number],
	Direction extends Directions,
> = Direction extends "up"
	? [CurrentPosition[0], Decrement<CurrentPosition[1]>]
	: Direction extends "down"
		? [CurrentPosition[0], Increment<CurrentPosition[1]>]
		: Direction extends "left"
			? [Decrement<CurrentPosition[0]>, CurrentPosition[1]]
			: Direction extends "right"
				? [Increment<CurrentPosition[0]>, CurrentPosition[1]]
				: never;
type MakeArray<Len extends number, Result extends any[] = []> = Result["length"] extends Len
	? Result
	: MakeArray<Len, [...Result, ""]>;
type Increment<Value extends number> = [...MakeArray<Value>, ""]["length"];
type Decrement<Value extends number> = MakeArray<Value> extends [...infer Rest, string]
	? Rest["length"]
	: -1;
type OutOfMaze<Maze extends MazeMatrix, X, Y> = X extends -1
	? true
	: Y extends -1
		? true
		: X extends Maze[0]["length"]
			? true
			: Y extends Maze["length"]
				? true
				: false;

type MakeCookieRow<Maze extends MazeMatrix[0]> = {
	[Key in keyof Maze]: "🍪";
};
type MakeCookieMatrix<Maze extends MazeMatrix> = {
	[Key in keyof Maze]: Maze[Key] extends MazeMatrix[0] ? MakeCookieRow<Maze[Key]> : never;
};

type PlaceSantaRow<Maze extends MazeMatrix[0], X extends number> = {
	[Key in keyof Maze]: Key extends `${X}` ? "🎅" : Maze[Key] extends "🎅" ? "  " : Maze[Key];
};
type EraseSantaRow<Maze extends MazeMatrix[0]> = {
	[Key in keyof Maze]: Maze[Key] extends "🎅" ? "  " : Maze[Key];
};
type PlaceSanta<Maze extends MazeMatrix, X extends number, Y extends number> = {
	[Key in keyof Maze]: Key extends `${Y}`
		? PlaceSantaRow<Maze[Y], X>
		: Maze[Key] extends MazeMatrix[0]
			? EraseSantaRow<Maze[Key]>
			: never;
};

type Move<Maze extends MazeMatrix, Direction extends Directions> = FindNextPosition<
	FindPosition<Maze>,
	Direction
> extends [infer X extends number, infer Y extends number]
	? OutOfMaze<Maze, X, Y> extends true
		? MakeCookieMatrix<Maze>
		: Maze[Y][X] extends "🎄"
			? Maze
			: PlaceSanta<Maze, X, Y>
	: never;
