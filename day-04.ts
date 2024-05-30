// https://typehero.dev/challenge/day-4

type Address = { address: string; city: string };
type PresentDeliveryList<Obj> = {
	[Key in keyof Obj]: Address
};
