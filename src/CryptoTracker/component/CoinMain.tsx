import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { allCoinsFetch } from "../api/allCoins";
import LoadingEl from "./Loading";
//g head 자식 태그 수정을 위한 기능...타이틀 등 헤더 관련 태그를 수정할 수 있다.
import { Helmet } from "react-helmet-async";

const Container = styled.main`
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const CoinList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    width: 100%;
`;

const Coin = styled.li`
    background-color: ${props => props.theme.bgWhite};
    color: #111;
    font-weight: bold;
    border-radius: 18px;
    box-shadow: 3px 3px 10px rgba(255, 255, 255, .5);
    overflow: hidden;
    a {
        display: grid;
        grid-template-columns: 8% 44% 44%;
        gap: 2%;
        align-items: center;
        padding: 20px;
        transition: background-color .1s ease-in;
        &:hover {
            background-color: ${props => props.theme.accentColor}
        }
    }
`;

const ListRank = styled.div`
    font-size: 20px;
`;

const ListTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 26px;
`;

const CoinImg = styled.img`
    width: 35px;
    height: 35px;
`;

const ListPriceWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ListPrice = styled.span`
`;

const ListPcWrap = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 26px;
    align-items: flex-end;
`;

const ListPC = styled.span`
    font-size: 12px;
`;

const ListPCP = styled.span<{chgp: number}>`
    background-color: ${
        props => props.chgp > 0 ? '#92D1C3' : '#F7A8A8'
    };
    border-radius: 8px;
    padding: 0px 5px;
    width: fit-content;
`;

interface ICoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | number;
    last_updated: string;
}

const CoinMain = () => {

    //g 리액트 쿼리 사용 전
    // const [coinData, setCoinData]   = useState<coinDataType[]>([]);
    // const [loading, setLoading]     = useState<boolean>(true);

    // useEffect(() => {

    //     (async () => {
            
    //         try {

    //             const res       = await axios.get('https://proxy.cors.sh/https://api.coinpaprika.com/v1/coins');
    //             const resData   = res.data.slice(0, 100);

    //             setCoinData(resData);
    //             setLoading(false); 

    //         } catch(error) {

    //             console.error(error);
    //         }

    //     })();

    // }, []);

    //g 사용 후
    /**
     * g react-query v4 이상 부터는 무조건 객체 형태로 전달해야한다.
     * g queryKey : 캐싱과 리패칭을 위한 키 (배열 형태 권장) (ex.데이터 캐싱 시, 특정 키값을 가진 데이터만 초기화 한다던지하는 데이터 조작 시 사용)
     * g queryFn : 데이터를 가져오는 비동기 함수
     * g enabled : false면 자동으로 실행되지 않음 (수동 실행 가능)
     * g staleTime : 데이터가 최신 상태로 유지되는 시간 (ms) (최신 상태로 인식하기에 데이터를 다시 불러오지 않고 캐시에 저장해둔 데이터 사용)
     * g cacheTime : 캐시에 남아 있는 시간 (기본 5분)
     * g refetchOnMount : 마운트될 때 다시 데이터를 불러올지 여부 (기본 true)
     * g refetchOnWindowFocus : 창으로 다시 돌아올 때 리패칭 여부 (기본 true)
     * g retry : 데이터 불러오기 실패 시, 재시도 기능 (ex. retry : 3)
     * g refetchInterval : 지정한 시간이 지날 때 마다 리패치 하여 데이터를 가져온다 (staleTime: 0, notifyOnChangeProps: "all"과 같이 사용하면 작은 변화가 있을 때를 포함하여 특정 시간 마다 계속 데이터를 리패치 한다)
     * g notifyOnChangeProps : 데이터의 작은 변화를 감지한다.
     * g refetchOnReconnect : 네트워크 연결 시 다시 데이터를 가져온다.
    */
    const {data : coinData, isLoading} = useQuery<ICoin[]>({
        queryKey : ["allCoins"], 
        queryFn : allCoinsFetch,
        refetchInterval : 10000,
    });

    /**
     * g Link state를 통해서 값을 보내줄 수도 있다. v5와 사용 방식이 다르다.
     * g state 값을 받을 때는 useLocation()을 사용하면 된다.
    */ 
    return (
        <Container>
            <Helmet>
                <title>CRYPTO TRACKER</title>
            </Helmet>
            <CoinList>
                {
                    isLoading
                    ? (
                        <LoadingEl />
                    )
                    : (
                        coinData?.map((el) => {
                            
                            const coinId    = el.id;
                            const coinName  = el.name;
                            const coinRank  = el.market_cap_rank;
                            const coinImg   = el.image;
                            const coinPrice = parseFloat(el.current_price.toFixed(3)).toLocaleString();
                            const coinPC    = parseFloat(el.price_change_24h.toFixed(3)).toLocaleString();
                            const coinPCP   = parseFloat(el.price_change_percentage_24h.toFixed(3));
                            
                            return (
                                <Coin key={coinId}>
                                    <Link 
                                    to={coinId} 
                                    state={{
                                        name : coinName
                                    }}>
                                        <ListRank>{coinRank}</ListRank>
                                        <ListTitle>
                                            <CoinImg src={coinImg} />
                                            {coinName}
                                        </ListTitle>
                                        <ListPriceWrap>
                                            <ListPrice>${coinPrice}</ListPrice>
                                            <ListPcWrap>
                                                <ListPC>{coinPC}$</ListPC>
                                                <ListPCP chgp={coinPCP} >{coinPCP}%</ListPCP>
                                            </ListPcWrap>
                                        </ListPriceWrap>
                                    </Link>
                                </Coin>
                            );
                        })
                    )
                }
            </CoinList>
        </Container>
    );
}

export default CoinMain;