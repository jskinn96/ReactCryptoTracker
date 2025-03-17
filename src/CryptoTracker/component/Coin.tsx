import { useState } from "react";
import { useLocation, useParams, Outlet, Link, useMatch } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingEl from "./Loading";
// import axios from "axios";
//g 객체의 타입을 확인하는 함수
// import typeTranslateObjConsole from "../../utils/typeTranslateConsole";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { coinInfoFetch } from "../api/allCoins";
import { ArrowLeft } from "lucide-react";
import IInfo from "../types/coinInfo";
import { toKMBT } from "../../utils/common";

//g useParams 사용 시, 기본 타입...키도 스트링인걸 알아야하고 값은 스트링이나 빈 값이 올 수 있다고 정의해야한다(없어도 자동으로 적용)
interface CoinType {
    [key: string]: string | undefined;
}

const Container = styled.main`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const TitleWrap = styled.div`
    position: relative;
    max-width: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    .titleLink {
        padding: 3px;
        border-radius: 50%;
        background-color: ${props => props.theme.bgDark};
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
            background-color: ${props => props.theme.accentColor};
        }
        .backArrow {
            color: ${props => props.theme.txtColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    padding: 10px 0;
    color: ${props => props.theme.yellowColor};
    font-weight: bold;
`;

const InfoSection = styled.section`
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    word-break:
`;

const OverviewWrap = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.bgDark};
    border-radius: 15px;
    padding: 10px 20px;
    position: relative;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    span {
        font-size: 20px;    
        &:first-child {
            font-size: 12px;
        }
    }
    &:nth-child(2) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const DescWrap = styled.div`
`;

const DescText = styled.span`
    line-height: 26px;
    margin-right: 10px;
`;

const MVBtn = styled.button`
    background: unset;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme.accentColor};
    font-size: 16px;
`;

const Tabs = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

//g DOM에 props를 넣을 때, 소문자여야 하며 밸류 값은 boolean값이 오면 오류가 난다. 
const Tab = styled.li<{active: string}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: ${props => props.theme.bgDark};
    padding: 7px 0px;
    border-radius: 10px;
    color: ${
        props => (
            props.active === 'true' ? props.theme.accentColor : props.theme.txtColor 
        )
    };
    a {
        display: block;
        font-weight: bold;
    }
`;

const Coin = () => {

    const { coinId }                = useParams<CoinType>();
    //g useLocation으로 받는 값은 링크 클릭이 이루어졌을 때, 값을 받을 수 있으므로 주의...한번에 url로 값을 받아올 수 없다.
    const { state }                 = useLocation();
    //g 현재 파라미터 값이 맞는 지 확인 : useMatch
    const chartMatch                = useMatch("/:coinId/chart"); 
    const priceMatch                = useMatch("/:coinId/price"); 
    const [isMV, setMV]             = useState(false);

    //g useQuery 사용 전
    // const [loading, setLoading]     = useState<boolean>(true);
    // const [priceObj, setPriceObj]   = useState<IPriceData>();
    // const [infoObj, setInfoObj]     = useState<IInfoData>();
    // useEffect(() => {

    //     (async () => {
            
    //         try {

    //             const [{data : priceData}, {data : infoData}] = await axios.all([
    //                 axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`),
    //                 axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`),
    //             ]);

    //             setPriceObj(priceData);
    //             setInfoObj(infoData);
    //             setLoading(false);

    //             //g 타입 변환 함수
    //             // typeTranslateObjConsole(priceData);
    //             // typeTranslateObjConsole(infoData);
                
    //         } catch(error) {
    
    //             console.error(error);
    //         }
    //     })()

    // }, [coinId]);

    //g useQuery 사용 후
    //g queryFn 사용 시, 실행한 함수를 넣는 게 아니라 실행할 함수 자체를 넣어야 하므로 () => 함수(test) 형태가 된다.
    //g 주석한 부분은 5초 마다 데이터를 가져올 수 있게 구성한 부분
    const { isLoading : loading, data : infoObj } = useQuery<IInfo>({
        queryKey : [coinId, 'info'],
        queryFn : () => coinInfoFetch(coinId),
        refetchInterval : 60000,
    });
    
    const coinName      = infoObj?.name;
    const coinRank      = infoObj?.market_cap_rank;
    const coinSymbol    = infoObj?.symbol;
    const coinMC        = infoObj?.market_data?.market_cap?.usd 
                        ? toKMBT(infoObj.market_data.market_cap.usd) 
                        : 'N/A';
    const coinDesc      = infoObj?.description?.en ? infoObj?.description.en : 'No description.';
    const coinTSupply   = infoObj?.market_data?.total_supply
                        ? toKMBT(infoObj.market_data.total_supply)
                        : 'N/A';
    const coinMSupply   = infoObj?.market_data?.max_supply
                        ? toKMBT(infoObj.market_data.max_supply)
                        : 'N/A';
    const coinPrice     = Number(infoObj?.market_data?.current_price?.usd);
    const roundPrice    = toKMBT(coinPrice);

    const SpDesc = coinDesc.split(' ');
    let coinDescText, MVBtnEL;
    if (SpDesc.length >= 50) {

        
        let MVBtnTxt;
        if (isMV === false) {
            
            MVBtnTxt = '...more';

            coinDescText = SpDesc.slice(0, 50).join(' ');

        } else {

            MVBtnTxt = 'close';

            coinDescText = coinDesc;
        }


        MVBtnEL = <MVBtn onClick={() => setMV(!isMV)}>{MVBtnTxt}</MVBtn>;

    } else {

        coinDescText = coinDesc;
    }

    return (
        <Container>
            <Helmet>
                <title>{coinName}</title>
            </Helmet>
            <TitleWrap>
                <Link
                to={"/"}
                className="titleLink"
                >
                    <ArrowLeft className="backArrow" />
                </Link>
                <Title>
                    {
                        state?.name 
                        ? state.name
                        : (
                            loading
                            ? ''
                            : coinName
                        )
                    }
                </Title>
            </TitleWrap>
            {
                loading
                ? <LoadingEl />
                : (
                    <InfoSection>
                        <OverviewWrap>
                            <OverviewItem>
                                <span>RANK</span>
                                <span>{coinRank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>SYMBOL</span>
                                <span>{coinSymbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>MARKET CAP</span>
                                <span>${coinMC}</span>
                            </OverviewItem>
                        </OverviewWrap>
                        <DescWrap>
                            <DescText>{coinDescText}</DescText>
                            {MVBtnEL}
                        </DescWrap>
                        <OverviewWrap>
                            <OverviewItem>
                                <span>TOTAL SUPPLY</span>
                                <span>{coinTSupply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>MAX SUPPLY</span>
                                <span>{coinMSupply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>PRICE</span>
                                <span>${roundPrice}</span>
                            </OverviewItem>
                        </OverviewWrap>
                    </InfoSection>
                )
            }
            <InfoSection>
                <nav>
                    <Tabs>
                        <Tab 
                        active={`${chartMatch !== null}`}>
                            <Link to={"Chart"}>Chart</Link>
                        </Tab>
                        <Tab
                        active={`${priceMatch !== null}`}>
                            <Link to={"Price"}>Price</Link>
                        </Tab>
                    </Tabs>
                </nav>
                <Outlet context={{coinId, infoObj}} />
            </InfoSection>
        </Container>
    );
}

export default Coin;