import Market from "src/types/Market";
import Account from "src/types/Account";

export function calculateCurrentPositionDetail(account: Account, selectedMarket: Market, markets: Market[]) {
    /**
     * @Fomula
     * Size = input * indexPrice 
     * Diff = equity - W // W = S * oP * M
     * Percent = (Size -/+ Diff)/Size  (isLong: -, isShort: +)
     * Liq.Price = oPrice * Percent
    */

    let leverage = 0;
    let currentLiqPrice = ''

    if (markets?.length !== 0 && account?.openPositions !== undefined && account?.openPositions !== null) {

        let W = 0;
        let restW = 0
        Object.keys(account?.openPositions).map((key) => {
            return Object.keys(markets).map((k) => {
                if (markets[k].market === account?.openPositions[key].market && selectedMarket.market !== account?.openPositions[key].market) {
                    restW += Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(markets[k].indexPrice) * parseFloat(markets[k].maintenanceMarginFraction)
                }
            })
        })


        let cSize = 0; // input * price
        let cOracleSize = 0;

        let oldIsLong = true;
        Object.keys(account?.openPositions).map((key) => {
            if (selectedMarket.market === account?.openPositions[key].market) {
                cSize = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(account?.openPositions[key].entryPrice)
                cOracleSize = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(selectedMarket.indexPrice)
                leverage = parseFloat((cOracleSize / parseFloat(account?.equity)).toFixed(2))
                if (account?.openPositions[key].side === 'LONG') oldIsLong = true;
                else oldIsLong = false
            }
        })

        let currentPercent = 0

        if (oldIsLong) {
            currentPercent = (cSize - ((parseFloat(account?.equity) - restW)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / cSize
        } else {
            currentPercent = (cSize + ((parseFloat(account?.equity) - restW)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / cSize
        }
        let hasPosition = Object.keys(account?.openPositions).find(key => account?.openPositions[key].market === selectedMarket.market)
        if (hasPosition !== undefined)
            currentLiqPrice = (parseFloat(selectedMarket?.indexPrice) * currentPercent).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))

        return { leverage, currentLiqPrice }
    }

    return { leverage, currentLiqPrice}
}