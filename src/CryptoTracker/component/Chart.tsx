import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { coinChartFetch } from "../api/allCoins";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import LoadingEl from "./Loading";
import { useState } from "react";
import { LineChart, CandlestickChart } from "lucide-react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../recoil/index";

const ToggleContainer = styled.div`
    display: flex;
    gap: 8px;
    padding: 6px;
    background: ${props => props.theme.bgDark};
    border-radius: 15px;
`;

const ToggleButton = styled.button<{ active: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: none;
    background: ${({ active }) => (active === 'true' ? "#4CAF50" : "transparent")};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: ${({ active }) => (active === 'true' ? "#45a049" : "#3a3a3a")};
    }

    svg {
        width: 24px;
        height: 24px;
        color: ${({ active }) => (active === 'true' ? "#fff" : "#bbb")};
        transition: color 0.3s ease-in-out;
    }
`;

const ChartWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ChartLine = styled.div`
    overflow: hidden;
    border-radius: 15px;
    background-color: ${props => props.theme.bgDark};
`;

const CoinChart = () => {

    const { coinId } = useOutletContext<{ coinId: string }>();
    const {isLoading, data : chartData} = useQuery<number[][]>({
        queryKey : [coinId, "chart"],
        queryFn : () => coinChartFetch(coinId)
    });
    const [chartType, setChartType] = useState< "line" | "candlestick" >("candlestick");
    const themeSelect = useRecoilValue(themeAtom);

    const safeChartData = Array.isArray(chartData) ? chartData : [];

    const handleToggle = (value: "line" | "candlestick" ) => {
        setChartType(value);
    };
    
    const timeCloseData: number[] = [];

    let chartSD, chartOpt: ApexOptions;
    if (chartType === 'line') {

        const closePriceData: number[]  = [];
    
        safeChartData.forEach((el) => {
    
            timeCloseData.push(el[0]);
            closePriceData.push(el[4]);
        });

        chartSD = [
            {
              name: "Price",
              data: closePriceData,
            },
        ];

        chartOpt = {
            theme: {
                mode: themeSelect,
            },
            chart: {
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            grid: {
                show: false 
            },
            stroke: {
                curve: "smooth",
                width: 4,
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                type: "datetime",
                categories: timeCloseData, 
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false 
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    gradientToColors: ["#0be881"], 
                    stops: [0, 100]
                },
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (value: number) => `$${value.toFixed(2)}`,
                },
            },
        }

    } else {

        interface ICandle {
            x: Date;
            y: number[] 
        } 

        const seriesData: ICandle[] = [];

        safeChartData.forEach((el) => {
    
            timeCloseData.push(el[0]);

            const tmpSD = {
                x: new Date(el[0]),
                y: el.slice(1)
            }

            seriesData.push(tmpSD);
        });

        chartSD = [
            {
              data: seriesData
            }
        ];

        chartOpt = {
            theme: {
                mode: themeSelect,
            },
            chart: {
                type: "candlestick",
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: "#26a69a", 
                        downward: "#ef5350", 
                    },
                    wick: {
                        useFillColor: true,
                    },
                },
            },
            stroke: {
                width: 1,
            },
            grid: {
                show: false 
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                type: "datetime",
                categories: timeCloseData, 
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false 
                },
            },
            fill: {
                type: 'solid',
                gradient: {}
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `$${value.toFixed(2)}`,
                },
            },
        }
    }

    return (
        <div>
            {
                isLoading ? (
                    <LoadingEl />
                )
                : (
                    <ChartWrap>
                        <ToggleContainer>
                            <ToggleButton active={chartType === "candlestick" ? 'true' : 'false'} onClick={() => handleToggle("candlestick")}>
                                <CandlestickChart />
                            </ToggleButton>
                            <ToggleButton active={chartType === "line" ? 'true' : 'false'} onClick={() => handleToggle("line")}>
                                <LineChart />
                            </ToggleButton>
                        </ToggleContainer>
                        <ChartLine>
                            <Chart 
                                type={chartType}
                                series={chartSD}
                                options={chartOpt}
                            />
                        </ChartLine>
                    </ChartWrap>
                )
            }
        </div>
    );
}

export default CoinChart;