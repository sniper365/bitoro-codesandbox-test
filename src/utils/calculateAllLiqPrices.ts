import Market from "src/types/Market";
import Account from "src/types/Account";

export function calculateAllLiqPrices(account: Account, markets: Market[]) {
    /**
     * @Fomula
     * Size = input * indexPrice 
     * Diff = equity - W // W = S * oP * M
     * Percent = (Size -/+ Diff)/Size  (isLong: -, isShort: +)
     * Liq.Price = oPrice * Percent
    */

    if (markets?.length !== 0 && account?.openPositions !== undefined && account?.openPositions !== null) {
        let W = 0;                    // total maintainence margin requirements *w
        let Ws = [] as { w: number, market: string, initialMF: string, indexPrice: string, tickSize: string }[];         // every w
        let restWs = [] as { restW: number, market: string, initialMF: string, indexPrice: string, tickSize: string }[];     // rest w = W -w
        Object.keys(account?.openPositions).map((key) => {
            Object.keys(markets).map((k) => {
                if (markets[k].market === account?.openPositions[key].market) {
                    let w = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(markets[k].indexPrice) * parseFloat(markets[k].maintenanceMarginFraction)
                    W += w;
                    Ws.push({
                        w: w,
                        market: account?.openPositions[key].market,
                        initialMF: markets[k].initialMarginFraction,
                        indexPrice: markets[k].indexPrice,
                        tickSize: markets[k].tickSize
                    })
                }
            })
        })

        Ws.map(w => {
            restWs.push({ restW: W - w.w, ...w })
        })

        let leverages = [] as number[];
        let currentPercent = 0
        let currentLiqPrices = [] as { market: string, liqPrice: string }[]

        Object.keys(account?.openPositions).map(key => {
            restWs.map(restW => {
                if (account?.openPositions[key].market == restW.market) {
                    let cSize = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(account?.openPositions[key].entryPrice)
                    if (account?.openPositions[key].side === 'LONG') {
                        currentPercent = (cSize - ((parseFloat(account?.equity) - restW.restW)) * (1 - parseFloat(restW.initialMF))) / cSize
                    } else {
                        currentPercent = (cSize + ((parseFloat(account?.equity) - restW.restW)) * (1 - parseFloat(restW.initialMF))) / cSize
                    }
                    let cOracleSize = Math.abs(parseFloat(account?.openPositions[key].size)) * parseFloat(restW.indexPrice)
                    leverages.push(parseFloat((cOracleSize / parseFloat(account?.equity)).toFixed(2)))
                    currentLiqPrices.push({ market: restW.market, liqPrice: (parseFloat(restW.indexPrice) * currentPercent).toFixed(Math.abs(Math.log10(parseFloat(restW.tickSize)))) })
                }
            })
        })

        return { leverages, currentLiqPrices }
    }

}