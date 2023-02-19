interface CryptoAssetDTO {
  title: string;
  symbol: string;
  holdings: number;
  marketPrice: number;
  costBasis: number;
  change: number;
  iconSrc: string;
}

/**
 * Converts a CoinGecko API coin object to a simplified DTO.
 *
 * @param {Object} obj - The CoinGecko API coin object to convert.
 * @returns {Object} A simplified DTO containing the coin's title, symbol, holdings, market price,
 * cost basis, change, and icon source URL.
 */
function convertCoinGeckoApiCoinObjectToDto(obj: any): CryptoAssetDTO {
  return {
    title: obj.name,
    symbol: obj.token,
    holdings: obj.holdings,
    marketPrice: obj.market_data.current_price.usd,
    costBasis: obj.fiat,
    change: obj.market_data.price_change_percentage_24h,
    iconSrc: obj.image.thumb
  };
}

export { convertCoinGeckoApiCoinObjectToDto };
