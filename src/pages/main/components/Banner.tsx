import {ReactComponent as BannerThing} from "../../../assets/banner_thingy.svg"
import NewStarperi from "/group_starperi.png";
import styles from "./Banner.module.css"

export default function Banner() {
    return <div className={[styles.banner, styles.flex_row].join(" ")}>
        <div className={[styles.banner_flavour_text].join(" ")}>
            <h1 aria-label={"Эти мероприятия могут вас заинтересовать"}>
                <span style={{font: "inherit"}} aria-hidden={true}>Эти</span>
                <span aria-hidden={true} className={styles.inverse_color_text_upper}>мероприятия</span>
                <br aria-hidden={true}/>
                <span style={{font: "inherit"}} aria-hidden={true}>могут Вас</span>
                <span aria-hidden={true} className={styles.inverse_color_text_lower}>заинтересовать!</span>
            </h1>
            {/*<p className={styles.how_does_it_work}>Как это работает?</p>*/}
            {/*<SearchBar/>*/}
        </div>
        <BannerThing className={styles.banner_decoration}/>
        <img className={styles.new_starperi} src={NewStarperi} alt={"Группа пожилых людей"}/>
        {/*<img className={styles.babushka} src={Babushka} alt={""}/>*/}
        {/*<img className={styles.starperi} src={Starperi} alt={""}/>*/}
    </div>
}