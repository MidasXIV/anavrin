import DividendController from "../../controllers/dividendController";

const dividendController = new DividendController();

export default dividendController.getDividendInfo.bind(dividendController);
