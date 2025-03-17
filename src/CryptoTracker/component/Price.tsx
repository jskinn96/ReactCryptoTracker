import { useOutletContext } from "react-router-dom";
import IInfo from "../types/coinInfo";
import { toKMBT } from "../../utils/common";
import styled from "styled-components";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Iprice {
    "title" : string,
    "val"   : number,
}

type IChartIcon = {
    //g 컴포넌트 또는 HTML 태그를 받을 수 있는 타입 
    Icon: React.ElementType;
    size: number; 
    color: string;
};

const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Container = styled.div`
    background: ${props => props.theme.bgDark};
    border-radius: 15px;
    padding: 10px 20px;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
`;

const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    span {    
        &:last-child {
            font-size: 26px;
            font-weight: bold;
            color: ${props => props.color};
        }
    }
`;

//g React.FC<IChartIcon> 함수형 컴포넌트(FC)에 IChartIcon 타입을 지정
const ChartIcon: React.FC<IChartIcon> = ({Icon, size, color}) => (
    <Icon size={size} color={color} />
); 

const Price = () => {

    const { infoObj } = useOutletContext<{infoObj : IInfo}>();
    
    const pricePer: Iprice[] = [
        {
            "title" : "1 hour", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_1h_in_currency?.usd),
        },
        {
            "title" : "24 hour", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_24h),
        },
        {
            "title" : "7 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_7d),
        },
        {
            "title" : "14 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_14d),
        },
        {
            "title" : "30 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_30d),
        },
        {
            "title" : "60 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_60d),
        },
        {
            "title" : "200 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_200d),
        },
        {
            "title" : "1 year", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_1y),
        },
    ];

    return (
        <Wrap>
            {
                pricePer.map((el, i) => {
                    
                    const title = el.title;
                    const value = el.val;

                    let priceColor,priceIcon;
                    if (value >= 0) {

                        priceColor  = "#26a69a";
                        priceIcon   = TrendingUp;

                    } else {
                        
                        priceColor  = "#ef5350"; 
                        priceIcon   = TrendingDown;
                    }

                    return (
                    <Container key={i}>
                        <ChartIcon Icon={priceIcon} size={64} color={priceColor} />
                        <TextWrap color={priceColor}>
                            <span>{title}</span>
                            <span>{toKMBT(value)}%</span>
                        </TextWrap>
                    </Container>
                    );
                })
            }
        </Wrap>
    );
}

export default Price;