import styles from "./Footer.module.css";
import Logo from "/footer-logo.png";
import Vk from "./assets/icons/vk.svg";
import Ok from "./assets/icons/ok.svg";
import Tg from "./assets/icons/telegram.svg";

function LinkToSocial({logo, text, link}: { logo: string, text: string, link: string }) {
    return <a href={link} className={styles.link_to_social}>
        <img src={logo} alt={""}/>
        <p>{text}</p>
    </a>
}

export default function Footer() {
    return <footer className={styles.footer}>
        <img src={Logo} alt={"Московское долголетие"} className={styles.logo}/>
        <div className={styles.links}>
            <LinkToSocial logo={Vk} text={"Мы ВКонтакте"} link={"https://vk.com/mosdolgoletie"}/>
            <LinkToSocial logo={Ok} text={"Мы в Одноклассниках"} link={"https://ok.ru/mosdolgoletie"}/>
            <LinkToSocial logo={Tg} text={"Мы в Телеграмме"} link={"https://t.me/mosdolgoletie"}/>
        </div>
        <label className={styles.contacts} aria-label={"Контакты"}>
            <b>Контакты</b>
            <ul aria-label={"Контакты"}>
                <li aria-label={"Телефон"}><a href={"tel:79128079999"}>Телефон: 79128079999</a></li>
                <li aria-label={"Почта"}>Почта: <a href={"mailto:dolgojit100_1@mos.ru"}>dolgojit100_1@mos.ru</a></li>
                <li aria-label={"Адрес"}>Адрес: улица Здоровья, дом 3, корпус 1</li>
            </ul>
        </label>
    </footer>
}