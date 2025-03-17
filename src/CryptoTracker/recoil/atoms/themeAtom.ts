import { atom } from "recoil";

/**
 * g 상태의 일부
 * g 해당 값을 가져와서 어느 컴포넌트에도 적용 가능
*/
export const themeAtom = atom<"light" | "dark">({
    //g 값의 키
    key: "themeAtom",
    //g 기본 값
    default: "dark",
});