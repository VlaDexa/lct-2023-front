import {LoginInfo} from "./App";
import NavBar from "./NavBar";
import {useState} from "react";
import {Outlet} from "react-router-dom";

export default function AfterLogin(props: {user: LoginInfo}) {
    const [blind, setBlind] = useState(false);

    return <div>
        <NavBar forBlind={blind} setForBlind={setBlind}></NavBar>
        <main>
            <Outlet/>
        </main>
    </div>;
}