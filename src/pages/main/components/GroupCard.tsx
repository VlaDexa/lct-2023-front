import styles from "./GroupCard.module.css";
import SmartBabushka from "/babushka-sportproger.png"
import ArtisticBabushka from "/artistic_babushka.png";
import GameStarperi from "/game_starperi.png";
import SingingBabushki from "/singing_babushki.png";
import TheatricalStarperi from "/theatrical_starperi.png";
import BusinessBabushki from "/business_babushki.png";
import DancingStarperi from "/dancing_starperi.png";
import CreativeBabushka from "/creative_babushka.png";
import SportDedi from "/sport_dedi.png";
import BoatBabushki from "/boat_babushki.png";
import IntellectualTour from "/intellectual_tour.png";

export function SmallMapMarker(props: { aria_hidden?: boolean }) {
    return <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden={props.aria_hidden}>
        <path
            d="M10 0C4.46667 0 0 4.65278 0 10.4167C0 17.3611 10 27.7778 10 27.7778C10 27.7778 20 17.3611 20 10.4167C20 4.65278 15.5333 0 10 0ZM10 3.47222C13.7 3.47222 16.6667 6.59722 16.6667 10.4167C16.6667 14.2708 13.7 17.3611 10 17.3611C6.33333 17.3611 3.33333 14.2708 3.33333 10.4167C3.33333 6.59722 6.33333 3.47222 10 3.47222Z"
            fill="#006739"/>
    </svg>
}

export function MetroMarker(props: { aria_hidden?: boolean }) {
    return <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden={props.aria_hidden}>
        <path
            d="M21.4176 13.7648L16.0448 0L11.5 8.04657L6.9736 0L1.5824 13.7648H0V15.851H8.1328V13.7648H6.9184L8.096 10.3376L11.5 16L14.904 10.3376L16.0816 13.7648H14.8672V15.851H23V13.7648H21.4176Z"
            fill="#006739"/>
    </svg>
}

export function Clock(props: { aria_hidden?: boolean }) {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden={props.aria_hidden}>
        <path
            d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 3C16.98 3 21 7.02 21 12C21 16.98 16.98 21 12 21C7.02 21 3 16.98 3 12C3 7.02 7.02 3 12 3ZM10.5 6V12.66L10.98 13.05L12.48 14.55L13.5 15.69L15.66 13.53L14.52 12.51L13.5 11.49V6.06H10.5V6Z"
            fill="#006739"/>
    </svg>
}

export enum GroupType {
    Game = 'игры',
    Education = 'образование',
    Singing = 'пение',
    Painting = 'рисование',
    Intellectual = 'интеллектуальный клуб',
    Theatre = 'московский театрал (актёрское мастерство)',
    SilverUni = 'серебряный университет',
    Trainings = 'тренировки долголетия (мед. реабилитация)',
    Dancing = 'танцы',
    Creativity = 'творчество',
    Physical = 'физическая активность'
}

function getTags(type: GroupType): string[] {
    const tags = new Map([
        ['игры', ['для общения', 'для концентрация', 'для настроения']],
        ['образование', ['для эрудиции', 'для общения', 'для любопытных']],
        ['пение', ['против стресса', 'для настроения', 'улучшение дыхания', 'для вдохновения']],
        ['рисование', ['для спокойствия', 'для вдохновения', 'для внимания']],
        ['интеллектуальный клуб', ['для эрудиции', 'для общения', 'для любопытных']],
        ['московский театрал (актёрское мастерство)', ['против тревоги', 'для памяти', 'для уверенности в себе', 'для общения', 'для вдохновения']],
        ['серебряный университет', ['для получения новой профессии', 'для эрудиции']],
        ['тренировки долголетия (мед. реабилитация)', ['для здоровья', 'против стресса']],
        ['танцы', ['улучшение координации', 'для памяти', 'против стресса', 'для уверенности в себе', 'для общения']],
        ['творчество', ['против тревожности', 'для настроения', 'для координации', 'для памяти', 'для общения']],
        ['физическая активность', ['против стресса', 'для здоровья', 'для координации', 'для общения']]
    ]);

    return tags.get(type)!;
}

function chooseYourBabushka(type: GroupType) {
    switch (type) {
        case GroupType.Game:
            return GameStarperi;
        case GroupType.Education:
            return SmartBabushka;
        case GroupType.Singing:
            return SingingBabushki;
        case GroupType.Painting:
            return ArtisticBabushka;
        case GroupType.Intellectual:
            return IntellectualTour;
        case GroupType.Theatre:
            return TheatricalStarperi;
        case GroupType.SilverUni:
            return BusinessBabushki;
        case GroupType.Trainings:
            return SportDedi;
        case GroupType.Dancing:
            return DancingStarperi;
        case GroupType.Creativity:
            return CreativeBabushka;
        case GroupType.Physical:
            return BoatBabushki;
    }
}

export type Group = {
    id: string,
    name: string,
    type: GroupType,
    address: string
    metro: string,
    timeToWalk: number,
    time: string[],
}

export default function GroupCard(props: { group: Group, index: number }) {
    const split_time = props.group.time.map(time => {
        const split = time.split(" ");
        const day = split[0];
        const timetime = split.slice(1).join(" ");
        return {
            day,
            time: timetime
        }
    });

    const tags = getTags(props.group.type);

    return <div className={styles.group_card}>
        <img src={chooseYourBabushka(props.group.type)} className={styles.preview} alt={""}/>
        <p className={styles.title}>{props.group.name}</p>
        <div className={styles.tag_line}>
            {tags.map(tag => <div key={tag} className={styles.tag}>{tag}</div>)}
        </div>
        <p className={styles.index}>№{props.index + 1} в вашем рейтинге</p>
        <div className={styles.date_place}>
            <Clock/>
            <div className={styles.dates}>
                {split_time.map(({day, time}) =>
                    <p key={day} className={styles.date}>
                        <b>{day}</b>
                        &nbsp;
                        {time}
                    </p>
                )}
            </div>
        </div>
        <div className={styles.address_place}>
            <div className={styles.address_string}>
                <SmallMapMarker/>
                <p>{props.group.address}</p>
            </div>
            <div className={styles.metro_string}>
                <MetroMarker/>
                <p>{props.group.metro}</p>
                <p> &#9679;</p>
                <p>{props.group.timeToWalk} минут пешком</p>
            </div>
        </div>
        <div className={styles.button_row}>
            <button className={styles.more_button}>Подробнее</button>
            <button className={styles.signup_button}>Записаться</button>
        </div>
    </div>
}