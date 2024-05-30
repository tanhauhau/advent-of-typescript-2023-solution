// https://typehero.dev/challenge/day-20

type Letters = {
	A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
	B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
	C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
	E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
	H: ["█ █ ", "█▀█ ", "▀ ▀ "];
	I: ["█ ", "█ ", "▀ "];
	M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
	N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
	P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
	R: ["█▀█ ", "██▀ ", "▀ ▀ "];
	S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
	T: ["▀█▀ ", "░█ ░", "░▀ ░"];
	Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
	W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
	" ": ["░", "░", "░"];
	":": ["#", "░", "#"];
	"*": ["░", "#", "░"];
};

type ToAsciiArt<
	Str,
	Result extends any[] = [],
	Line1 extends string = "",
	Line2 extends string = "",
	Line3 extends string = "",
> = Str extends `${infer First}${infer Rest}`
	? Uppercase<First> extends `${infer UppercaseFirst extends keyof Letters}`
		? ToAsciiArt<
				Rest,
				Result,
				`${Line1}${Letters[UppercaseFirst][0]}`,
				`${Line2}${Letters[UppercaseFirst][1]}`,
				`${Line3}${Letters[UppercaseFirst][2]}`
			>
		: ToAsciiArt<Rest, [...Result, Line1, Line2, Line3]>
	: [...Result, Line1, Line2, Line3];
