import styled from "styled-components"
import { Link } from "react-router-dom";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { themeAtom } from "../recoil/index";
import { useRecoilState, useRecoilValue } from "recoil";

const Container = styled.header`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background-color: ${props => props.theme.bgHeader};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1;
    > * {
        flex: 1;
    }
    > a {
        text-align: center; 
    }
`;
const TitleCont = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.025em;
`;
const TitleHighlight = styled.span`
    color: #facc15;
`;

const RightWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const SwitchWrap = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    input {
        display: none;
    }
    input:checked + .HTSwitchSlider::before {
        transform: translateX(22px);
    }
`;

const SwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #A0AEC0;
    border-radius: 34px;
    transition: .3s;
    &::before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 5px;
        bottom: 3px;
        background-color: ${props => props.theme.bgDarkColor};
        border-radius: 50%;
        transition: 0.4s;
    }
    .HTSIcon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
    }
    .HTSIcon.sun {
        left: 6px;
        color: ${props => props.theme.yellowColor};
    }
    .HTSIcon.moon {
        right: 6px;
        color: ${props => props.theme.accentColor};
    }
`;

const ThemeSwitch = () => {

    const [themeSelect, setThemeSelect] = useRecoilState(themeAtom);

    return (
        <SwitchWrap>
            <input
            type="checkbox"
            checked={themeSelect === "dark"}
            onChange={() => setThemeSelect(themeSelect === "dark" ? "light" : "dark")}
            />
            <SwitchSlider
            className="HTSwitchSlider">
                {
                    themeSelect === "dark" 
                    ? <Moon className="HTSIcon moon" /> 
                    : <Sun className="HTSIcon sun" />
                }
            </SwitchSlider>
        </SwitchWrap>
    );
}

/**
 * 
interface ITheme {
    themeSelect: "dark" | "light";
    setThemeMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}
 * g const Header: React.FC<ITheme> = ({themeSelect, setThemeMode})
 * g react function component에 ITheme을 적용
*/
const Header = () => {

    return (
        <Container>
            <div></div>
            <Link to={"/"}>
                <TitleCont>
                    <TitleHighlight>CRYPTO</TitleHighlight> TRACKER
                </TitleCont>
            </Link>
            <RightWrap>
                <ThemeSwitch />
            </RightWrap>
        </Container>
    );
}

export default Header;