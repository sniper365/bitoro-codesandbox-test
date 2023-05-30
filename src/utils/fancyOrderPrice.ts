import Market from "src/types/Market"

const fancyOrderPrice = (orderType: string, selectedMarket: Market, isLong: boolean, orderLimitPrice: string, tickSize: number) => {
    const fancyOrderTickSizeCreteria = tickSize
    if (orderType === 'MARKET') {
        if (isLong) {
            return (parseFloat(selectedMarket?.indexPrice) + parseFloat(selectedMarket?.tickSize) * fancyOrderTickSizeCreteria).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))
        } else
            return (parseFloat(selectedMarket?.indexPrice) - parseFloat(selectedMarket?.tickSize) * fancyOrderTickSizeCreteria).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))
    } else {
        if (isLong) {
            return (parseFloat(orderLimitPrice) + parseFloat(selectedMarket?.tickSize) * fancyOrderTickSizeCreteria).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))
        } else
            return (parseFloat(orderLimitPrice) - parseFloat(selectedMarket?.tickSize) * fancyOrderTickSizeCreteria).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.tickSize))))
    }
}

export default fancyOrderPrice