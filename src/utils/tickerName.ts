const tickerName = (asset: string) => {
    if (asset == 'ETH') return 'Ethereum'
    if (asset == 'UNI') return 'Uniswap'
    if (asset == '1INCH') return '1inch'
    if (asset == 'ADA') return 'Cardano'
    if (asset == 'AVAX') return 'Avalanche'
    if (asset == 'CELO') return 'Celo'
    if (asset == 'DOGE') return 'Dogecoin'
    if (asset == 'DOT') return 'Polkadot'
    if (asset == 'ETC') return 'Ethereum Classic'
    if (asset == 'LINK') return 'Chainlink'
    if (asset == 'MATIC') return 'Polygon'
    if (asset == 'NEAR') return 'Near'
    if (asset == 'SOL') return 'Solana'
    if (asset == 'SUSHI') return 'SushiSwap'
    if (asset == 'YFI') return 'Yearn'
    if (asset == 'ATOM') return 'Cosmos'
    if (asset == 'AAVE') return 'Aave'
    if (asset == 'LTC') return 'Litecoin'
    if (asset == 'SNX') return 'Synthetix'
    return 'Bitcoin'
}

export default tickerName