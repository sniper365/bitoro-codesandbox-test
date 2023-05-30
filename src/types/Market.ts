interface Market {
  assetResolution: string,
  baseAsset: string,
  baselinePositionSize: string,
  incrementalInitialMarginFraction: string,
  incrementalPositionSize: string,
  indexPrice: string,
  initialMarginFraction: string,
  maintenanceMarginFraction: string,
  market: string,
  maxPositionSize: string,
  minOrderSize: string,
  nextFundingAt: string,
  nextFundingRate: string,
  openInterest: string,
  oraclePrice: string,
  priceChange24H: string,
  quoteAsset: string,
  status: string,
  stepSize: string,
  syntheticAssetId: string,
  tickSize: string,
  trades24H: string,
  transferMarginFraction: string,
  type: string,
  volume24H: string
}

export default Market;
