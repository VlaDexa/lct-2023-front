import {useCallback, useState} from "react";
import Login from "./Login";
import AfterLogin from "./AfterLogin";

export type LoginInfo = {};

export default function App() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>();
    const setUser = useCallback((userInfo: LoginInfo) => {
        setLoginInfo(userInfo)
    }, [setLoginInfo]);

    if (loginInfo) {
        return <AfterLogin user={loginInfo}></AfterLogin>
    } else {
        return <Login setUser={setUser}></Login>
    }
}
