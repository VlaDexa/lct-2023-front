import {ReactComponent as BannerThing} from "../../../assets/banner_thingy.svg"
import Babushka from "/scandinavian_babushka.png"
import Starperi from "/old_normal_sport_starperi.png"
import styles from "./Banner.module.css"
import SearchBar from "./SearchBar";

export default function Banner() {
    return <div className={[styles.banner, styles.flex_row].join(" ")}>
        <div className={[styles.flex_column, styles.banner_flavour_text].join(" ")}>
            <div className={styles.flex_row}><p>Эти&nbsp;</p><p className={styles.inverse_color_text_upper}>&nbsp;мероприятия&nbsp;</p></div>
            <div className={styles.flex_row}><p>могут вас&nbsp;</p><p className={styles.inverse_color_text_lower}>&nbsp;заинтересовать!&nbsp;</p></div>
            <p className={styles.how_does_it_work}>Как это работает?</p>
            <SearchBar/>
        </div>
        <BannerThing className={styles.banner_decoration}/>
        <img className={styles.babushka} src={Babushka} alt={""}/>
        {/*<img className={styles.starperi} src={Starperi} alt={""}/>*/}
    </div>
}