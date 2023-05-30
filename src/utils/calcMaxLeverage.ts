export const calcMaxLeverage = (ticker: string) => {
    if (ticker == 'BTC' || ticker == 'ETH')
        return 20
    if (ticker == '1INCH' || ticker == 'CELO' || ticker == 'SNX')
        return 5
    return 10
}

