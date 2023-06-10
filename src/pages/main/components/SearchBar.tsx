import styles from "./SearchBar.module.css"
import {ReactComponent as Lupa} from "../../../assets/icons/lupa.svg";
import {useRef} from "react";


export default function SearchBar(props: {setSearch: (newValue: string) => void}) {
    const search = useRef("");

    return <div className={styles.search}>
        <input className={styles.search_bar} placeholder={"Поиск по мероприятиям"} role={"searchbox"} onChange={event => {
            search.current = event.currentTarget.value;
        }}/>
        <button className={styles.search_button} aria-label={"Поиск"} role={"search"} onClick={() => props.setSearch(search.current)}>
            <Lupa className={styles.lupa}/>
        </button>
        {/*<button className={styles.options_button} aria-label={"Фильтры"}>*/}
        {/*    <Settings className={styles.settings}/>*/}
        {/*</button>*/}
    </div>
}