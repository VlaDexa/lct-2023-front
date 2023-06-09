import React, {useReducer, useState} from "react";
import Login from "./pages/login/Login";
import AfterLogin from "./AfterLogin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/MainPage";
import Profile from "./pages/profile/Profile";
import Help from "./pages/help/Help";
import Quiz from "./pages/login/Quiz";
import LoginInfo from "./LoginInfo";
import {UserService} from "./openapi";

function needsQuiz(info: LoginInfo): boolean {
    return info.needsQuiz;
}

enum Page {
    Login,
    Quiz,
    Other
}

export default function App() {
    const [loginInfo, setLoginInfo] = useState(LoginInfo.loadFromLocal);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);

    async function sendQuiz(
        gender: string,
        address: string,
        activities: { name: string, value: number }[]
    ) {
        await UserService.updateUserApiV1UserUpdateUserPut({
            address,
            sex: gender,
            survey_result: JSON.stringify(activities.map(el => el.value))
        });
        setLoginInfo((old) => {
            old!.needsQuiz = false;
            return old;
        })
        forceUpdate();
    }

    if (loginInfo) {
        if (!needsQuiz(loginInfo)) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<AfterLogin user={loginInfo}/>}>
                            <Route index element={<Main/>}/>
                            <Route path={"profile"} element={<Profile login={loginInfo}/>}/>
                            <Route path={"help"} element={<Help/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>);
        } else {
            return <Quiz setQuizAnswers={({gender, address, activities}) => sendQuiz(gender, address, activities)}/>
        }
    } else {
        return <Login setUser={setLoginInfo}/>
    }
}
