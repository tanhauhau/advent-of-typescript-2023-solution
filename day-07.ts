// https://typehero.dev/challenge/day-7

type AppendGood<Obj> = {
	[Key in keyof Obj as Key extends string ? `good_${Key}` : never]: Obj[Key];
};
