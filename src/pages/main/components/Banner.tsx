import {ReactComponent as BannerThing} from "../../../assets/banner_thingy.svg"
import NewStarperi from "/group_starperi.png";
import styles from "./Banner.module.css"
import {useRef} from "react";
import {Dialog} from "../../../Dialog";

export default function Banner() {
    const howDoesItWork = useRef<HTMLDialogElement>(null);

    return <div className={[styles.banner, styles.flex_row].join(" ")}>
        <div className={[styles.banner_flavour_text].join(" ")}>
            <h1 aria-label={"Эти мероприятия могут вас заинтересовать"} style={{marginBottom: 0}}>
                <span style={{font: "inherit"}} aria-hidden={true}>Эти</span>
                <span aria-hidden={true} className={styles.inverse_color_text_upper}>мероприятия</span>
                <br aria-hidden={true}/>
                <span style={{font: "inherit"}} aria-hidden={true}>могут Вас</span>
                <span aria-hidden={true} className={styles.inverse_color_text_lower}>заинтересовать!</span>
            </h1>
            <Dialog ref={howDoesItWork} className={styles.how_does_it_work_dialog}>
                <h1>
                    Есть вопросы?
                    <br/>
                    Оставьте свой номер телефона и мы с Вами свяжемся!
                </h1>
                <input type={"tel"} placeholder={"+7"} pattern={"+7\d{10}"}/>
                <button className={"btn btn_primary"} onClick={() => howDoesItWork.current!.close()}><b>Оставить
                    запрос</b></button>
            </Dialog>
            <button className={styles.how_does_it_work} onClick={() => howDoesItWork.current!.showModal()}>Как это
                работает?
            </button>
            {/*<SearchBar/>*/}
        </div>
        <BannerThing className={styles.banner_decoration}/>
        <img className={styles.new_starperi} src={NewStarperi} alt={"Группа пожилых людей"}/>
        {/*<img className={styles.babushka} src={Babushka} alt={""}/>*/}
        {/*<img className={styles.starperi} src={Starperi} alt={""}/>*/}
    </div>
}