type Divisable = {
    isDivisable: boolean,
    fraction: number
}
export function Divisable(size: string, market: string) {
    const divisable: Divisable =
        market == 'BTC' ?
            { isDivisable: (parseFloat(size) * 10 ** 4) % 1 == 0, fraction: 0.0001 }
            : market == 'ETH' ?
                { isDivisable: (parseFloat(size) * 10 ** 3) % 1 == 0, fraction: 0.001 }
                : { isDivisable: (parseFloat(size) * 10 ** 2) % 1 == 0, fraction: 0.1 }
    return divisable
}