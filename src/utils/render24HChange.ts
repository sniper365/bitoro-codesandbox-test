import { numberFormat } from "./numberFormat"

const render24HChange = (priceChange: string, selectedMarketPrice: string) => {
    if (parseFloat(selectedMarketPrice) > 100) {
        return numberFormat(parseFloat(priceChange).toFixed(2))
    } else {
        return numberFormat(parseFloat(priceChange).toFixed(3))
    }
}

export default render24HChange