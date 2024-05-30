// https://typehero.dev/challenge/day-11

type SantaListProtector<Obj> = Obj extends Function
	? Obj
	: Obj extends {}
		? {
				readonly [Key in keyof Obj]: SantaListProtector<Obj[Key]>;
			}
		: Obj;
