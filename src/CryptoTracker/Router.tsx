import { createBrowserRouter } from "react-router-dom";
import App from "./CoinApp";
import Coin from "./component/Coin";
import CoinMain from "./component/CoinMain";
import CoinChart from "./component/Chart";
import Price from "./component/Price";

export const router = createBrowserRouter(
[
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "",
                element : <CoinMain />
            },
            {
                path : ":coinId",
                element : <Coin />,
                children : [
                    {
                        path : "chart",
                        element : <CoinChart />
                    },
                    {
                        path : "price",
                        element : <Price />
                    }
                ]
            }
        ]
    }
],
{ 
    basename: "/ReactCryptoTracker" 
}
);