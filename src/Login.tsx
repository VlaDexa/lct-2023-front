import {LoginInfo} from "./App";
import {useCallback} from "react";

export default function Login(props: {setUser: (info: LoginInfo) => unknown}) {
    const setUser = useCallback((info: LoginInfo) => {
        props.setUser(info)
    }, [props.setUser]);

    return <div>
        <label>Войти</label>
        <button onClick={() => setUser({})}>Войти</button>
    </div>;
}