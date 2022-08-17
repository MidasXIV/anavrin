type DividendInfoSuccess = {
  type: "DividendInfoSuccess";
};

type InvalidTicker = {
  type: "InvalidTicker";
};

type NoDividendInfo = {
  type: "NoDividendInfo";
};

interface DividendInformationDTO
  extends Omit<PrimaryDividendInformationDTO, "stockSummary">,
    ParseDividendInformationDTO,
    StockSummaryInterface {
  symbol: string;
  type?: unknown;
}

type DividendInfoResponse = Either<
  DividendInfoSuccess | InvalidTicker | NoDividendInfo,
  DividendInformationDTO
>;

interface IDividendInfo {
  execute(ticker: string): Promise<DividendInfoResponse>;
}
