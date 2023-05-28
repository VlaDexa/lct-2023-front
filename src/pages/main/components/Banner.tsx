import {ReactComponent as BannerThing} from "../../../assets/banner_thingy.svg"
import NewStarperi from "/group_starperi.png";
import styles from "./Banner.module.css"
import SearchBar from "./SearchBar";

export default function Banner() {
    return <div className={[styles.banner, styles.flex_row].join(" ")}>
        <div className={[styles.flex_column, styles.banner_flavour_text].join(" ")}>
            <div className={styles.flex_row}><p className={styles.big_text}>Эти&nbsp;</p><p
                className={[styles.inverse_color_text_upper, styles.big_text].join(" ")}>&nbsp;мероприятия&nbsp;</p>
            </div>
            <div className={styles.flex_row}><p className={styles.big_text}>могут Вас&nbsp;</p><p
                className={[styles.inverse_color_text_lower, styles.big_text].join(" ")}>&nbsp;заинтересовать!&nbsp;</p>
            </div>
            <p className={styles.how_does_it_work}>Как это работает?</p>
            <SearchBar/>
        </div>
        <BannerThing className={styles.banner_decoration}/>
        <img className={styles.new_starperi} src={NewStarperi} alt={"Группа пожилых людей"}/>
        {/*<img className={styles.babushka} src={Babushka} alt={""}/>*/}
        {/*<img className={styles.starperi} src={Starperi} alt={""}/>*/}
    </div>
}