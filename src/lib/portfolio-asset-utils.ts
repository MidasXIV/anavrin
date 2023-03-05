/**
 * Converts a CoinGecko API coin object to a simplified DTO.
 *
 * @param {Object} obj - The CoinGecko API coin object to convert.
 * @returns {Object} A simplified DTO containing the coin's title, symbol, holdings, market price,
 * cost basis, change, and icon source URL.
 */
function convertCoinGeckoApiCoinObjectToDTO(obj: any): CryptoAssetDTO {
  return {
    title: obj.name,
    token: obj.token,
    holdings: obj.holdings,
    marketPrice: obj.market_data.current_price.usd,
    fiat: obj.fiat,
    change: obj.market_data.price_change_percentage_24h,
    iconSrc: obj.image.thumb
  };
}

function convertCryptoPortfolioItemToPersistence(obj: CryptoAssetDTO): CryptoPortfolioItem {
  return {
    token: obj.token,
    holdings: obj.holdings,
    fiat: obj.fiat
  };
}

export { convertCoinGeckoApiCoinObjectToDTO, convertCryptoPortfolioItemToPersistence };
