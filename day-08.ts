// https://typehero.dev/challenge/day-8

type RemoveNaughtyChildren<Obj> = {
	[Key in keyof Obj as Key extends `naughty_${string}` ? never : Key]: Obj[Key];
};
