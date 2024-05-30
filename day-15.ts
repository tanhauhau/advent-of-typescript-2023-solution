// https://typehero.dev/challenge/day-15

type CreateArray<V extends string, Len extends number, Array extends any[] = []> = 
	Array['length'] extends Len
	? Array
	: CreateArray<V, Len, [...Array, V]>

type BoxToys<Value extends string, Length extends number> = {
	[Key in Length]: CreateArray<Value, Key>
}[Length]
