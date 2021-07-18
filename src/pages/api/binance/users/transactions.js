import BinanceController from "../../../../controllers/binanceController";

const binanceController = new BinanceController();

export default binanceController.myTrades.bind(binanceController);
