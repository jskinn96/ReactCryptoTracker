import { Outlet } from "react-router-dom";
import Header from "./component/Header";
//g head dom 내용을 변경 가능하게 해주는 기능...HelmetProvider 사용 후 자식에게 Helmet으로 특정 기능에서 head에 들어가는 태그 내용을 변경할 수 있다.
import { HelmetProvider } from "react-helmet-async";
import { DarkMode, LightMode } from "../common/theme";
import { ThemeProvider } from 'styled-components';
import Reset from '../common/resetCSS';
// import { useEffect, useState } from "react";
import { themeAtom } from "./recoil/index";
import { useRecoilValue } from "recoil";

const App = () => {

    //g themeAtom의 값을 가져온다.
    const themeSelect   = useRecoilValue(themeAtom);
    const themeMode     = themeSelect === "dark" ? DarkMode : LightMode;

    return (
        <ThemeProvider theme={themeMode}>
            <Reset />
            <HelmetProvider>
                <Header />
                <Outlet />
            </HelmetProvider>
        </ThemeProvider>
    );
}

export default App;