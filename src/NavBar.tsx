import styles from "./NavBar.module.css";
import {ReactComponent as CommentSquareNormal }from "./assets/icons/comment_square/normal.svg";
import {ReactComponent as CommentSquareActive }from "./assets/icons/comment_square/active.svg";
import {ReactComponent as PersonNormal} from "./assets/icons/person/normal.svg";
import {ReactComponent as PersonActive} from "./assets/icons/person/active.svg";
import {ReactComponent as HomeNormal} from "./assets/icons/home/normal.svg";
import {ReactComponent as HomeActive} from "./assets/icons/home/active.svg";
import {ReactComponent as EyeNormal} from "./assets/icons/eye/normal.svg";
import {ReactComponent as EyeActive} from "./assets/icons/eye/active.svg";
import {FunctionComponent, SVGProps, useCallback, KeyboardEvent} from "react";
import FontSizeChanger from "./FontSizeChanger";

export enum NavState {
    Main,
    Profile,
    Help
}

function Vr() {
    return <div className={styles.vr}>

    </div>
}

function LogoAndText(props: {
    normalSvg: FunctionComponent<SVGProps<SVGSVGElement>>,
    activeSvg: FunctionComponent<SVGProps<SVGSVGElement>>,
    children: string,
    isActive?: boolean,
    onClick?: () => void,
}) {
    const onKeyUp = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (props.onClick && event.key === "Enter") {
            props.onClick();
        }
    }, [props.onClick]);

    const Logo = props.isActive ? props.activeSvg : props.normalSvg;

    return <div className={styles.logo_and_text} onClick={props.onClick} onKeyUp={onKeyUp} tabIndex={0}>
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

export default function NavBar(props: {navState: NavState, setNavState: (state: NavState) => void, forBlind: boolean, setForBlind: (blind: boolean) => void}) {
    const setNavMain = useCallback(() =>  {
        props.setNavState(NavState.Main);
    }, [props.setNavState]);

    const setNavProfile = useCallback(() => {
        props.setNavState(NavState.Profile);
    }, [props.setNavState]);

    const setNavHelp = useCallback(() => {
        props.setNavState(NavState.Help);
    }, [props.setNavState]);

    const setForBlind = useCallback(() => {
        props.setForBlind(!props.forBlind)
    }, [props.setForBlind, props.forBlind]);

    return <nav className={styles.nav}>
        <div className={styles.align_start}>
            <LogoAndText normalSvg={HomeNormal} activeSvg={HomeActive} isActive={props.navState === NavState.Main} onClick={setNavMain}>Главная</LogoAndText>
            <Vr/>
            <LogoAndText normalSvg={PersonNormal} activeSvg={PersonActive} isActive={props.navState === NavState.Profile} onClick={setNavProfile}>Личный кабинет</LogoAndText>
            <Vr/>
            <LogoAndText normalSvg={CommentSquareNormal} activeSvg={CommentSquareActive} isActive={props.navState === NavState.Help} onClick={setNavHelp}>Помощь</LogoAndText>
        </div>
        <div className={styles.align_end}>
            <LogoAndText normalSvg={EyeNormal} activeSvg={EyeActive} isActive={props.forBlind} onClick={setForBlind}>Для слабовидящих</LogoAndText>
            <Vr/>
            <FontSizeChanger makeItLarger={null!} makeItSmaller={null!}></FontSizeChanger>
        </div>
    </nav>
}