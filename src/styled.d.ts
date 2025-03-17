import "styled-components";

//g styled-components를 임폴트 해서 디클레어로 styled-components의 모듈을 정의 후 DefaultTheme 인터페이스를 업데이트 해준 후 export로 사용할 수 있게 함  
declare module 'styled-components' {
    // export interface DefaultTheme {
    //     bgColor     : string;
    //     color       : string;
    //     btnColor    : string;
    // }
    // export interface DefaultTheme {
    //     bgColor     : string;
    //     txtColor    : string;
    //     accentColor : string;
    //     bgDarkColor : string;
    //     bgHeader    : string;
    //     bgWhite     : string;
    //     bgDark      : string;
    // }
    export type DefaultTheme = Record<string, string>;
}