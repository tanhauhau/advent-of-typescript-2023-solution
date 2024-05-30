// https://typehero.dev/challenge/day-5

type SantasList<Bad extends ReadonlyArray<any>, Good extends ReadonlyArray<any>> = [...Bad, ...Good];
