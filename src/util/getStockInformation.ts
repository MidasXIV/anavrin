import axios from "axios";

const getStockInformation = async (ticker: string): Promise<any> => {
  return axios(`/api/dividend/?ticker=${ticker}`);
};

export default getStockInformation;
