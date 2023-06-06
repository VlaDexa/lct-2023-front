import NavBar from "./NavBar";
import {useState} from "react";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import LoginInfo from "./LoginInfo";

export default function AfterLogin(props: {user: LoginInfo}) {
    const [blind, setBlind] = useState(false);

    return <div>
        <NavBar forBlind={blind} setForBlind={setBlind}/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>;
}