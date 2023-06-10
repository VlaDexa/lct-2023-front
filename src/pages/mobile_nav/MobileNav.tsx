import styles from "./MobileNav.module.css";
import {Link} from "react-router-dom";
import React, {forwardRef, useCallback, useEffect, useReducer, useState} from "react";
import Home from "../../assets/icons/home/normal.svg";
import Person from "../../assets/icons/person/normal.svg";
import Exit from "../../assets/icons/exit.svg";
import Eye from "../../assets/icons/eye/normal.svg";
import CommentSquare from "../../assets/icons/comment_square/active.svg";

function IconAndText(props: {icon: string, children: string, isActive: boolean, onClick?: React.MouseEventHandler<HTMLDivElement>}) {
    return <div className={`${props.isActive ? "filter_to_primary_green" : ""} ${styles.icon_and_text}`} onClick={props.onClick}>
        <img src={props.icon} alt={""}/>
        <span>{props.children}</span>
    </div>
}
export const MobileNav = forwardRef<HTMLDialogElement, {
    className?: string,
    close: () => void,
    onHelp: () => void,
    onBlind: () => void,
}>((props, ref) => {
    const [location, setLocation] = useState(window.location.pathname);

    useEffect(() => {setLocation(window.location.pathname)}, [window.location.pathname]);

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const updateAndClose = useCallback(() => {
        forceUpdate();
        props.close();
    }, []);

    return <dialog className={`${styles.dialog} ${props.className}`} ref={ref}>
        <div className={styles.inner}>
            <Link to={""} onClick={updateAndClose}><IconAndText icon={Home} isActive={location === "/"}>Главная</IconAndText></Link>
            <hr/>
            <Link to={"/profile"} onClick={updateAndClose}><IconAndText icon={Person} isActive={location === "/profile"}>Профиль</IconAndText></Link>
            <hr/>
            <button style={{backgroundColor: "transparent", border: "none"}} onClick={() => {
                window.localStorage.clear();
                window.location.reload();
            }}><IconAndText icon={Exit} isActive={false}>Выход</IconAndText></button>
            <hr/>
            <button onClick={() => {
                updateAndClose();
                props.onHelp();
            }} style={{backgroundColor: "transparent", border: "none"}}><IconAndText icon={CommentSquare} isActive={false}>Помощь</IconAndText></button>
            <hr/>
            <button style={{backgroundColor: "transparent", border: "none"}} onClick={() => {
                updateAndClose();
                props.onBlind();
            }}><IconAndText icon={Eye} isActive={document.body.attributes.getNamedItem("data-blind")!.value === "true"}>Для слабовидящих</IconAndText></button>
        </div>
    </dialog>
});