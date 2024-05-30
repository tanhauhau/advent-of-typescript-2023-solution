// https://typehero.dev/challenge/day-6

type FilterChildrenBy<Union, ToRemove> = Exclude<Union, ToRemove>;
