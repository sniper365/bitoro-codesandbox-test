export function MaximumOrderSize(market: string) {
    if (market === 'ETH') return '0.01';
    if (market === 'DOGE') return '100';
    if (market === 'SOL') return '1';
    if (market === 'MATIC') return '10';
    if (market == 'UNI') return '1';
    if (market == '1INCH') return '10';
    if (market == 'ADA') return '10';
    if (market == 'AVAX') return '1';
    if (market == 'CELO') return '10';
    if (market == 'DOT') return '1';
    if (market == 'ETC') return '1';
    if (market == 'LINK') return '1';
    if (market == 'NEAR') return '1';
    if (market == 'SUSHI') return '1';
    if (market == 'YFI') return '0.001';
    return '0.001'
}