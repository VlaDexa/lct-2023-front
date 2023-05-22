import Banner from "./components/Banner";
import styles from "./MainPage.module.css";
import {useCallback, useState} from "react";

export default function Main() {
    const [isOnline, setOnline] = useState(false);
    const setOnlineTrue = useCallback(() => {setOnline(true)}, [setOnline]);
    const setOnlineFalse = useCallback(() => {setOnline(false)}, [setOnline]);

    return <div>
        <Banner/>
        <div className={styles.picker}>
            <div className={styles.online_picker}>
                <div className={!isOnline ? styles.active : undefined} tabIndex={0} onClick={setOnlineFalse}>Очно</div>
                <div className={isOnline ? styles.active : undefined} tabIndex={0} onClick={setOnlineTrue}>Онлайн</div>
            </div>
        </div>
    </div>
}