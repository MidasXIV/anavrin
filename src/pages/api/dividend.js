import YahooFinanceRepo from "../../repositories/yahooFinanceRepo";
import { DividendInfo, CreateDividendInfoController } from "../../controllers/dividendInfo";

const yahooFinanceRepo = new YahooFinanceRepo();
const dividendInfo = new DividendInfo(yahooFinanceRepo);
const createDividendInfoController = new CreateDividendInfoController(dividendInfo);

export default createDividendInfoController.execute.bind(createDividendInfoController);
