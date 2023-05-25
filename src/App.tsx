import {useCallback, useState} from "react";
import Login from "./pages/login/Login";
import AfterLogin from "./AfterLogin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/MainPage";
import Profile from "./pages/profile/Profile";
import Help from "./pages/help/Help";

export type LoginInfo = {};

export default function App() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>();
    const setUser = useCallback((userInfo: LoginInfo) => {
        setLoginInfo(userInfo)
    }, [setLoginInfo]);

    if (loginInfo) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<AfterLogin user={loginInfo}/>}>
                        <Route index element={<Main/>} />
                        <Route path={"profile"} element={<Profile />}/>
                        <Route path={"help"} element={<Help />}/>
                    </Route>
                </Routes>
            </BrowserRouter>);
    } else {
        return <Login setUser={setUser}></Login>
    }
}
