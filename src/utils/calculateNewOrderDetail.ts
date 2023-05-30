import Market from "src/types/Market";
import Position from "src/types/Position";

export function calculateNewOrderDetail(account: any, input: string, selectedMarket: Market, markets: Market[], isLong: boolean) {
    /**
     * @Fomula
     * Size = input * indexPrice 
     * Diff = equity - W // W = S * oP * M
     * Percent = (Size -/+ Diff)/Size  (isLong: -, isShort: +)
     * Liq.Price = oPrice * Percent
    */
    let liqPrice = ''
    let leverage = 0;
    let isReturnLongSide = true as boolean | null

    if (markets?.length !== 0 && account?.openPositions !== undefined && account?.openPositions !== null) {
        let W = 0;
        let restW = 0
        Object.keys(account?.openPositions).map((key) => {
            return Object.keys(markets).map((k) => {
                if (markets[k].market === account?.openPositions[key].market) {
                    W += Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(markets[k].oraclePrice) * parseFloat(markets[k].maintenanceMarginFraction)
                }
                if (markets[k].market === account?.openPositions[key].market && selectedMarket.market !== account?.openPositions[key].market) {
                    restW += Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(markets[k].oraclePrice) * parseFloat(markets[k].maintenanceMarginFraction)
                }
            })
        })


        let cW = 0;
        let cSize = 0; // input * price
        let oldSizeAmount = 0;  // just input or size
        let oldIsLong = true;
        Object.keys(account?.openPositions).map((key) => {
            if (selectedMarket.market === account?.openPositions[key].market) {
                cW = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(selectedMarket?.oraclePrice) * parseFloat(selectedMarket?.maintenanceMarginFraction)
                cSize = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(account?.openPositions[key].entryPrice)
                oldSizeAmount = Math.abs(parseFloat(account?.openPositions[key].size))
                if (account?.openPositions[key].side === 'LONG') oldIsLong = true;
                else oldIsLong = false
            }
        })

        let percent = 0

        let isNewOrder = true

        Object.keys(account?.openPositions).map((key) => {
            if (account?.openPositions[key].market === selectedMarket?.market) {
                return isNewOrder = false
            }
        })

        if (isNewOrder) {   // brandNew Order
            const size = parseFloat(input) * parseFloat(selectedMarket?.oraclePrice)
            leverage = parseFloat((size / parseFloat(account?.equity)).toFixed(2))
            if (isLong) {
                percent = (size - ((parseFloat(account?.equity) - W)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / size
                isReturnLongSide = true
            } else {
                percent = (size + ((parseFloat(account?.equity) - W)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / size
                isReturnLongSide = false
            }
            if (percent > 0)
                liqPrice = (parseFloat(selectedMarket?.oraclePrice) * percent).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))
            return { liqPrice, isReturnLongSide, leverage }
        } else {   // exist Order
            if (isLong) {
                if (oldIsLong) {
                    const size = parseFloat(input) * parseFloat(selectedMarket?.oraclePrice)
                    percent = (size + cSize - ((parseFloat(account?.equity) - (W + cW))) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / (size + cSize)
                    leverage = parseFloat(((size + cSize) / parseFloat(account?.equity)).toFixed(2))
                    isReturnLongSide = true
                } else { // @todo::
                    /**
                     * 1. calc the diff of size: e.g. input - oldSizeAmount
                     * 2. then would be same with same direction order...
                    */
                    if (parseFloat(input) > oldSizeAmount) {
                        const diff = parseFloat(input) - oldSizeAmount
                        const size = diff * parseFloat(selectedMarket?.oraclePrice)
                        percent = (size - ((parseFloat(account?.equity) - restW)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / size
                        isReturnLongSide = true
                    } else {
                        const diff = oldSizeAmount - parseFloat(input)
                        const size = diff * parseFloat(selectedMarket?.oraclePrice)
                        percent = (size + ((parseFloat(account?.equity) - restW)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / size
                        isReturnLongSide = false
                    }
                }
            } else { //@todo::
                if (oldIsLong) {
                    if (parseFloat(input) > oldSizeAmount) {
                        const diff = parseFloat(input) - oldSizeAmount
                        const size = diff * parseFloat(selectedMarket?.oraclePrice)
                        percent = (size + ((parseFloat(account?.equity) - restW)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / size
                        isReturnLongSide = false
                    } else {
                        const diff = oldSizeAmount - parseFloat(input)
                        const size = diff * parseFloat(selectedMarket?.oraclePrice)
                        percent = (size - ((parseFloat(account?.equity) - restW)) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / (cSize - size)
                        isReturnLongSide = true
                    }
                } else {
                    const size = parseFloat(input) * parseFloat(selectedMarket?.oraclePrice)
                    percent = (size + cSize + ((parseFloat(account?.equity) - (W + cW))) * (1 - parseFloat(selectedMarket?.initialMarginFraction))) / (size + cSize)
                    leverage = parseFloat(((size + cSize) / parseFloat(account?.equity)).toFixed(2))
                    isReturnLongSide = false
                }
            }
            liqPrice = (parseFloat(selectedMarket?.oraclePrice) * percent).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))

            if (parseFloat(input) == oldSizeAmount) {
                liqPrice = '';
                isReturnLongSide = null
            }
            return { liqPrice, isReturnLongSide, leverage }
        }
    }
    // return { liqPrice, isReturnLongSide, leverage }

}