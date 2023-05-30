import Market from "src/types/Market";

export function calculateCollateral(input: string, selectedMarket: Market, equity: string, isInputedA: boolean) {
    let flashloan = ''
    let marketLeverage = 0
    if (isInputedA) {
        flashloan = (parseFloat(input) * parseFloat(selectedMarket?.indexPrice)).toFixed(2).toString()
        marketLeverage = parseFloat((parseFloat(flashloan) / parseFloat(equity)).toFixed(2))
    } else {
        flashloan = (parseFloat(input) / parseFloat(selectedMarket?.indexPrice)).toFixed(Math.abs(Math.log10(parseFloat(selectedMarket?.stepSize)))).toString()
        marketLeverage = parseFloat((parseFloat(input) / parseFloat(equity)).toFixed(2))
    }
    return { flashloan, marketLeverage }
}