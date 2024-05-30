// https://typehero.dev/challenge/day-22

/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type ValidateRow<Row> = Reindeer extends Row ? true : false;

type Validate<Sudoku extends any[][][]> = // row

		| ValidateRow<Sudoku[0][number][number]>
		| ValidateRow<Sudoku[1][number][number]>
		| ValidateRow<Sudoku[2][number][number]>
		| ValidateRow<Sudoku[3][number][number]>
		| ValidateRow<Sudoku[4][number][number]>
		| ValidateRow<Sudoku[5][number][number]>
		| ValidateRow<Sudoku[6][number][number]>
		| ValidateRow<Sudoku[7][number][number]>
		| ValidateRow<Sudoku[8][number][number]>
		// column
		| ValidateRow<Sudoku[number][0][0]>
		| ValidateRow<Sudoku[number][0][1]>
		| ValidateRow<Sudoku[number][0][2]>
		| ValidateRow<Sudoku[number][1][0]>
		| ValidateRow<Sudoku[number][1][1]>
		| ValidateRow<Sudoku[number][1][2]>
		| ValidateRow<Sudoku[number][2][0]>
		| ValidateRow<Sudoku[number][2][1]>
		| ValidateRow<Sudoku[number][2][2]>
		// grid
		| ValidateRow<Sudoku[0][0][number] | Sudoku[1][0][number] | Sudoku[2][0][number]>
		| ValidateRow<Sudoku[0][1][number] | Sudoku[1][1][number] | Sudoku[2][1][number]>
		| ValidateRow<Sudoku[0][2][number] | Sudoku[1][2][number] | Sudoku[2][2][number]>
		| ValidateRow<Sudoku[3][0][number] | Sudoku[4][0][number] | Sudoku[5][0][number]>
		| ValidateRow<Sudoku[3][1][number] | Sudoku[4][1][number] | Sudoku[5][1][number]>
		| ValidateRow<Sudoku[3][2][number] | Sudoku[4][2][number] | Sudoku[5][2][number]>
		| ValidateRow<Sudoku[6][0][number] | Sudoku[7][0][number] | Sudoku[8][0][number]>
		| ValidateRow<Sudoku[6][1][number] | Sudoku[7][1][number] | Sudoku[8][1][number]>
		| ValidateRow<Sudoku[6][2][number] | Sudoku[7][2][number] | Sudoku[8][2][number]> extends true
		? true
		: false;
