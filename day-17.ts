// https://typehero.dev/challenge/day-17

type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type WinMap = {
	"👊🏻": "✌🏽";
	"🖐🏾": "👊🏻";
	"✌🏽": "🖐🏾";
};

type WhoWins<P1 extends RockPaperScissors, P2 extends RockPaperScissors> = P1 extends P2
	? "draw"
	: WinMap[P2] extends P1
		? "win"
		: "lose";
