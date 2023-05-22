import {LoginInfo} from "./App";
import NavBar, {NavState} from "./NavBar";
import {useCallback, useState} from "react";
import Main from "./pages/main/MainPage";

export default function AfterLogin(props: {user: LoginInfo}) {
    const [navState, setNavState] = useState(NavState.Main);
    const [blind, setBlind] = useState(false);

    const setNavCallback = useCallback(setNavState, [setNavState]);
    const setBlindState = useCallback(setBlind, [setBlind]);

    let DisplayedPage;

    switch (navState) {
        case NavState.Main:
            DisplayedPage = <Main/>
    }

    return <div>
        <NavBar navState={navState} setNavState={setNavCallback} forBlind={blind} setForBlind={setBlindState}></NavBar>
        <main>
           {DisplayedPage}
        </main>
    </div>;
}