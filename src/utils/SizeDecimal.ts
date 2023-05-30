export function SizeDecimal(market: string) {
    return market == 'BTC' ? 4 : market == 'ETH' ? 3 : 1
}