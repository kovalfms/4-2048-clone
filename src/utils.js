import {useEffect} from "react";


export const useEvent = (event, handler) => {
    useEffect(() => {
            window.addEventListener(event, handler)

            return () => {
                window.removeEventListener(event, handler)

            }
        }
    )
}

export const BtnColors = (num) => {
    switch (num) {
        case 2:
            return "#939090";
        case 4:
            return "#f5c379";
        case 8:
            return "#E9A067";
        case 16:
            return "#F08151";
        case 32:
            return "#F2654F";
        case 64:
            return "#F1462C";
        case 128:
            return "#7fc56f";
        case 256:
            return "#51a22c";
        case 512:
            return "#0aad03";
        case 1024:
            return "#f568c8";
        case 2048:
            return "#942777";
        default:
            return "#cdc1b5";
    }
};