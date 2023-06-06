import NavBar from "./NavBar";
import {createContext, useState} from "react";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import LoginInfo from "./LoginInfo";

export const LoginContext = createContext<LoginInfo>(null!);

export default function AfterLogin(props: { user: LoginInfo }) {
    const [blind, setBlind] = useState(false);

    return <div>
        <NavBar forBlind={blind} setForBlind={setBlind}/>
        <main>
            <LoginContext.Provider value={props.user}>
                <Outlet/>
            </LoginContext.Provider>
        </main>
        <Footer/>
    </div>;
}