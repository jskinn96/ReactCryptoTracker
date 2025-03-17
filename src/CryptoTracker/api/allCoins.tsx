import axios from "axios";
import typeTranslateObjConsole from "../../utils/typeTranslateConsole";

const coinRoot = 'https://api.coingecko.com/api/v3/coins';

export const allCoinsFetch = async () => {

    try {

        const res   = await axios.get(`${coinRoot}/markets?vs_currency=usd&order=market_cap_rank&per_page=100`);
        const data  = res.data;

        return data;

    } catch (error) {

        console.error(error);
    }
}

export const coinInfoFetch = async (coinId : string | undefined) => {

    try {
        
        const res   = await axios.get(`${coinRoot}/${coinId}`);
        const data  = res.data;
        
        return data;

    } catch (error) {

        console.error(error);
    }
}

export const coinChartFetch = async (coinId : string | undefined) => {

    try {
        
        const res   = await axios.get(`${coinRoot}/${coinId}/ohlc?vs_currency=usd&days=14`);
        const data  = res.data;

        return data;

    } catch (error) {

        console.error(error);
    }
}