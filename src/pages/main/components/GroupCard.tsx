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
import Flower from "../../../assets/flower.svg"
import React, {useCallback, useContext, useRef, useState} from "react";
import {ApiError, GroupsService} from "../../../openapi";
import Days from "../../../DateFormatter";
import {Dialog} from "../../../Dialog";
import {LoginContext} from "../../../AfterLogin";

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
    Intellectual = 'спецпроект / интеллектуальный клуб',
    Theatre = 'спецпроект / московский театрал',
    SilverUni = 'спецпроект / серебряный университет',
    Trainings = 'спецпроект / тренировки долголетия (спецпроект по медицинской реабилитации)',
    Dancing = 'танцы',
    Creativity = 'творчество',
    Physical = 'физическая активность'
}

function getTags(type: GroupType): string[] {
    const tags = new Map([
        [GroupType.Game, ['для общения', 'для концентрация', 'для настроения']],
        [GroupType.Education, ['для эрудиции', 'для общения', 'для любопытных']],
        [GroupType.Singing, ['против стресса', 'для настроения', 'улучшение дыхания', 'для вдохновения']],
        [GroupType.Painting, ['для спокойствия', 'для вдохновения', 'для внимания']],
        [GroupType.Intellectual, ['для эрудиции', 'для общения', 'для любопытных']],
        [GroupType.Theatre, ['против тревоги', 'для памяти', 'для уверенности в себе', 'для общения', 'для вдохновения']],
        [GroupType.SilverUni, ['для получения новой профессии', 'для эрудиции']],
        [GroupType.Trainings, ['для здоровья', 'против стресса']],
        [GroupType.Dancing, ['улучшение координации', 'для памяти', 'против стресса', 'для уверенности в себе', 'для общения']],
        [GroupType.Creativity, ['против тревожности', 'для настроения', 'для координации', 'для памяти', 'для общения']],
        [GroupType.Physical, ['против стресса', 'для здоровья', 'для координации', 'для общения']]
    ]);

    return tags.get(type)!.slice(0, 3);
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
    description: string,
}

export function deduplicate<T>(array: T[], getKey: (item: T) => string | number) {
    const seenItems: Record<string, boolean> = {};
    return array.filter((item) => {
        const key = getKey(item);
        if (seenItems[key]) {
            return false;
        }
        seenItems[key] = true;
        return true;
    });
}

export default function GroupCard(props: { group: Group, index: number }) {
    const tags = getTags(props.group.type);
    const [isDescription, setDescription] = useState(false);
    const signDialog = useRef<HTMLDialogElement>(null);
    const register = useCallback(() => {
        signDialog.current!.showModal();
        // GroupsService.createAttendApiV1GroupsAttendsPost(Number(props.group.id));
        // alert("Вы зарегестрировались на " + props.group.name);
    }, [props.group.id]);
    const loginInfo = useContext(LoginContext);

    const formattedTime = deduplicate(props.group.time.flatMap(time => new Days(time).days), (item) => item.day);

    return <div className={styles.group_card} aria-label={props.group.name}>
        <Dialog ref={signDialog} className={styles.signDialog}>
            <img src={Flower} alt={""} className={styles.signFlower}></img>
            <div>
                <h1 className={styles.signTitle}>Мы успешно записали вас на {props.group.name}</h1>
                <div className={styles.date_place} style={{textAlign: "left", marginLeft: "100px"}}>
                    <Clock/>
                    <div className={styles.dates} aria-label={"Даты проведения"}>
                        {
                            formattedTime.map(time =>
                                <p key={time.day} className={styles.date}>
                                    {time.toJSX()}
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
            {props.group.metro !== "Онлайн" ?
                <div className={styles.address_place} style={{marginLeft: "100px", marginBottom: "24px"}}>
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
                </div> :
                <div className={styles.address_place}>
                    <div className={styles.address_string}>
                        <SmallMapMarker/>
                        <span>{props.group.metro}</span>
                    </div>
                </div>
            }
            <button className={`btn btn_primary ${styles.signButton}`} onClick={() => {
                GroupsService.createAttendApiV1GroupsAttendsPost(Number(props.group.id)).catch(
                    (error) => {
                        if (!(error instanceof ApiError && error.status === 401)) throw error;

                        return loginInfo.resetToken().then(() => GroupsService.createAttendApiV1GroupsAttendsPost(Number(props.group.id)));
                    }
                );
                signDialog.current!.close()
            }}
                    style={{marginTop: "20px"}}><b>Готово</b></button>
            <button className={`btn btn-secondary ${styles.signButton}`} onClick={() => {
                signDialog.current!.close();
            }}>Отменить запись
            </button>
        </Dialog>
        <img src={chooseYourBabushka(props.group.type)} className={styles.preview} alt={""}/>
        <span className={styles.id}>ID: {props.group.id}</span>
        <h3 className={styles.title}>{props.group.name}</h3>
        <div className={styles.tag_line}>
            {tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
        <div className={styles.flair_tags}>
            <p className={styles.index}>Подобрано для вас</p>
            {props.group.timeToWalk <= 20 && props.group.metro !== "Онлайн" ? <p className={styles.index}>недалеко от вас</p> : undefined}
        </div>
        <div className={styles.date_place}>
            <Clock/>
            <div className={styles.dates} aria-label={"Даты проведения"}>
                {
                    formattedTime.map(time =>
                        <p key={time.day} className={styles.date}>
                            {time.toJSX()}
                        </p>
                    )
                }
            </div>
        </div>
        {props.group.metro !== "Онлайн" ?
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
            </div> :
            <div className={styles.address_place}>
                <div className={styles.address_string}>
                    <SmallMapMarker/>
                    <span>{props.group.metro}</span>
                </div>
            </div>
        }
        <div className={styles.button_row}>
            <button className={`${styles.more_button} ${isDescription ? styles.active : undefined}`}
                    onClick={() => setDescription(old => !old)}>Подробнее
            </button>
            <button className={styles.signup_button} onClick={register}>Записаться</button>
        </div>

        {isDescription ?
            <div className={styles.description_box}>{props.group.description}</div>
            : undefined}
    </div>
}