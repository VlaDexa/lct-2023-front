import styles from "./NavBar.module.css";
import {ReactComponent as PersonActive} from "./assets/icons/person/active.svg";
import {ReactComponent as HomeActive} from "./assets/icons/home/active.svg";
import {ReactComponent as EyeActive} from "./assets/icons/eye/active.svg";
import {FunctionComponent, KeyboardEvent, SVGProps, useCallback, useEffect, useState} from "react";
import {ReactComponent as Exit} from "./assets/icons/exit.svg";
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

    const Logo = props.activeSvg;

    return <div className={styles.logo_and_text} onClick={props.onClick} onKeyUp={onKeyUp} tabIndex={props.tabIndex}>
        <Logo className={`${styles.logo} ${props.isActive ? "filter_to_primary_green" : undefined}`}/>
        <p className={props.isActive ? styles.active : undefined}>{props.children}</p>
    </div>
}

// export enum FontSize {
//     Normal,
//     Medium,
//     Large,
//     Xl,
//     Xxl
// }

export default function NavBar(props: { forBlind: boolean, setForBlind: (blind: boolean) => void }) {
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
            <Link to={"/"}><LogoAndText activeSvg={HomeActive}
                                        isActive={navState === NavState.Main} onClick={setNavMain}>Главная</LogoAndText></Link>
            <Vr/>
            <Link to={"/profile"}>
                <LogoAndText activeSvg={PersonActive} isActive={navState === NavState.Profile}
                             onClick={setNavProfile}>Личный кабинет</LogoAndText>
            </Link>
            <Vr/>
            <button className={styles.exit_button} onClick={() => {
                window.localStorage.clear();
                window.location.reload();
            }}>
                <LogoAndText activeSvg={Exit}>Выход</LogoAndText>
            </button>
            {/*<Vr/>*/}
            {/*<Link to={"/help"}>*/}
            {/*    <LogoAndText activeSvg={CommentSquareActive}*/}
            {/*                 isActive={navState === NavState.Help} onClick={setNavHelp}>Помощь</LogoAndText>*/}
            {/*</Link>*/}
        </div>
        <div className={styles.align_end}>
            <LogoAndText activeSvg={EyeActive} isActive={props.forBlind} onClick={setForBlind}
                         tabIndex={0}>Для слабовидящих</LogoAndText>
            {/*<Vr/>*/}
            {/*<FontSizeChanger makeItLarger={null!} makeItSmaller={null!}/>*/}
        </div>
    </nav>
}