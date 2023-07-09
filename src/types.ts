export type City = {
    label: string,
    lat: number,
    lon: number,
}
export type FuelType = "oktan95" | "oktan98" | "on" | "onPlus" | "lpg"

export type FuelPrice = {
    [key: FuelType]: number,
}

export type CityKey = keyof City