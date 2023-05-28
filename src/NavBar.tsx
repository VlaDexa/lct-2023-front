import styles from "./NavBar.module.css";
import {ReactComponent as CommentSquareNormal} from "./assets/icons/comment_square/normal.svg";
import {ReactComponent as CommentSquareActive} from "./assets/icons/comment_square/active.svg";
import {ReactComponent as PersonNormal} from "./assets/icons/person/normal.svg";
import {ReactComponent as PersonActive} from "./assets/icons/person/active.svg";
import {ReactComponent as HomeNormal} from "./assets/icons/home/normal.svg";
import {ReactComponent as HomeActive} from "./assets/icons/home/active.svg";
import {ReactComponent as EyeNormal} from "./assets/icons/eye/normal.svg";
import {ReactComponent as EyeActive} from "./assets/icons/eye/active.svg";
import {FunctionComponent, KeyboardEvent, SVGProps, useCallback, useEffect, useState} from "react";
import FontSizeChanger from "./FontSizeChanger";
import {Link} from "react-router-dom";

export enum NavState {
    Main,
    Profile,
    Help,
    Other,
}

function Vr() {
    return <div className={styles.vr}></div>
}

function LogoAndText(props: {
    normalSvg: FunctionComponent<SVGProps<SVGSVGElement>>,
    activeSvg: FunctionComponent<SVGProps<SVGSVGElement>>,
    children: string,
    isActive?: boolean,
    onClick?: () => void,
    tabIndex?: number,
}) {
    const onKeyUp = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (props.onClick && event.key === "Enter") {
            props.onClick();
        }
    }, [props.onClick]);

    const Logo = props.isActive ? props.activeSvg : props.normalSvg;

    return <div className={styles.logo_and_text} onClick={props.onClick} onKeyUp={onKeyUp} tabIndex={props.tabIndex}>
        <Logo className={styles.logo}/>
        <p className={props.isActive ? styles.active : undefined}>{props.children}</p>
    </div>
}

export enum FontSize {
    Normal,
    Medium,
    Large,
    Xl,
    Xxl
}

export default function NavBar(props: {forBlind: boolean, setForBlind: (blind: boolean) => void}) {
    function defineNavState(): NavState {
        switch (document.location.pathname) {
            case "/":
                return NavState.Main;
            case "/profile":
                return NavState.Profile;
            case "/help":
                return NavState.Help;
            default:
                return NavState.Other;
        }
    }

    const [navState, setNavState] = useState(defineNavState);

    useEffect(() => {
        setNavState(defineNavState);
    }, [document.location.pathname])

    const setNavMain = useCallback(() =>  {
        setNavState(NavState.Main);
    }, [setNavState]);

    const setNavProfile = useCallback(() => {
        setNavState(NavState.Profile);
    }, [setNavState]);

    const setNavHelp = useCallback(() => {
        setNavState(NavState.Help);
    }, [setNavState]);

    const setForBlind = useCallback(() => {
        props.setForBlind(!props.forBlind);
        const blind_attr = document.body.attributes.getNamedItem("data-blind")!;
        blind_attr.value = (!props.forBlind).toString();
        document.body.attributes.setNamedItem(blind_attr);
    }, [props.setForBlind, props.forBlind]);

    return <nav className={styles.nav}>
        <div className={styles.align_start}>
            <Link to={"/"}><LogoAndText normalSvg={HomeNormal} activeSvg={HomeActive} isActive={navState === NavState.Main} onClick={setNavMain}>Главная</LogoAndText></Link>
            <Vr/>
            <Link to={"/profile"}>
                <LogoAndText normalSvg={PersonNormal} activeSvg={PersonActive} isActive={navState === NavState.Profile}
                             onClick={setNavProfile}>Личный кабинет</LogoAndText>
            </Link>
            <Vr/>
            <Link to={"/help"}>
                <LogoAndText normalSvg={CommentSquareNormal} activeSvg={CommentSquareActive}
                             isActive={navState === NavState.Help} onClick={setNavHelp}>Помощь</LogoAndText>
            </Link>
        </div>
        <div className={styles.align_end}>
            <LogoAndText normalSvg={EyeNormal} activeSvg={EyeActive} isActive={props.forBlind} onClick={setForBlind}
                         tabIndex={0}>Для слабовидящих</LogoAndText>
            <Vr/>
            <FontSizeChanger makeItLarger={null!} makeItSmaller={null!}></FontSizeChanger>
        </div>
    </nav>
}