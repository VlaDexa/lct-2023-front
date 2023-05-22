import styles from "./MainPage.Banner.SearchBar.module.css"
import {ReactComponent as Lupa} from "./assets/icons/lupa.svg";
import {ReactComponent as Settings} from "./assets/icons/settings.svg";


export default function SearchBar() {
    return <div className={styles.search}>
        <input className={styles.search_bar} placeholder={"Поиск по мероприятиям"} role={"searchbox"}/>
        <button className={styles.search_button} aria-label={"Поиск"} role={"search"}>
            <Lupa className={styles.lupa}/>
        </button>
        <button className={styles.options_button} aria-label={"Фильтры"}>
            <Settings className={styles.settings}/>
        </button>
    </div>
}