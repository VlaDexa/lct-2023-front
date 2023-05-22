import styles from "./FontSizeChanger.module.css";
import ZoomInNormal from "./assets/icons/zoom_in/normal.svg"
import ZoomInActive from "./assets/icons/zoom_in/active.svg"
import ZoomOutNormal from "./assets/icons/zoom_out/normal.svg"
import ZoomOutActive from "./assets/icons/zoom_out/active.svg"
import {KeyboardEvent, useCallback, useState} from "react";

export default function FontSizeChanger(props: {
    makeItLarger: () => void,
    makeItSmaller: () => void
}) {
    const [isActiveOut, setActiveOut] = useState(false);
    const setActiveStateOut = useCallback(setActiveOut, [setActiveOut]);
    const setActiveStateOutTrue = useCallback(() => setActiveStateOut(true), [setActiveStateOut]);
    const setActiveStateOutFalse = useCallback(() => setActiveStateOut(false), [setActiveStateOut]);

    const [isActiveIn, setActiveIn] = useState(false);
    const setActiveStateIn = useCallback(setActiveIn, [setActiveIn]);
    const setActiveStateInTrue = useCallback(() => setActiveStateIn(true), [setActiveStateIn]);
    const setActiveStateInFalse = useCallback(() => setActiveStateIn(false), [setActiveStateIn]);

    const onKeyUpOut = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            setActiveStateOutFalse();
        }
    }, [setActiveStateOutFalse]);
    const onKeyDownOut = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            setActiveStateOutTrue();
        }
    }, [setActiveStateOutTrue]);

    const onKeyUpIn = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            setActiveStateInFalse();
        }
    }, [setActiveStateInFalse]);
    const onKeyDownIn = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            setActiveStateInTrue();
        }
    }, [setActiveStateInTrue]);

    return <div className={styles.font_size_changer}>
        <p className={styles.text}>Размер шрифта</p>
        <button className={isActiveOut ? styles.active : undefined} onClick={props.makeItSmaller} onKeyUp={onKeyUpOut} onKeyDown={onKeyDownOut} onMouseDown={setActiveStateOutTrue} onMouseUp={setActiveStateOutFalse} aria-label={"Уменьшить размер текста"}>
            <img src={isActiveOut ? ZoomOutActive : ZoomOutNormal} alt={""}/>
        </button>
        <button className={isActiveIn ? styles.active : undefined} onClick={props.makeItLarger} onKeyUp={onKeyUpIn} onKeyDown={onKeyDownIn} onMouseDown={setActiveStateInTrue} onMouseUp={setActiveStateInFalse} aria-label={"Увеличить размер текста"}>
            <img src={isActiveIn ? ZoomInActive : ZoomInNormal} alt={""}/>
        </button>
    </div>
}