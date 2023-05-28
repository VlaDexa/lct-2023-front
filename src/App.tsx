import {useState} from "react";
import Login from "./pages/login/Login";
import AfterLogin from "./AfterLogin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/MainPage";
import Profile from "./pages/profile/Profile";
import Help from "./pages/help/Help";
import Quiz from "./pages/login/Quiz";

export type LoginInfo = {
    needsQuiz: boolean
};

function needsQuiz(info: LoginInfo): boolean {
    return info.needsQuiz;
}

export default function App() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>();

    if (loginInfo) {
        if (!needsQuiz(loginInfo)) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<AfterLogin user={loginInfo}/>}>
                            <Route index element={<Main/>}/>
                            <Route path={"profile"} element={<Profile/>}/>
                            <Route path={"help"} element={<Help/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>);
        } else {
            return <Quiz setUser={setLoginInfo}/>
        }
    } else {
        return <Login setUser={setLoginInfo}></Login>
    }
}
