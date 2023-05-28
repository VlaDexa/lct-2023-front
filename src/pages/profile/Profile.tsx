import styles from "./Profile.module.css";
import {LoginInfo} from "../../App";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GroupCardProfile from "./GroupCardProfile";

export type PartialGroup = {
    id: string,
    name: string,
    address: string,
    metro: string,
    timeToWalk: number,
    time: string[]
}

export default function Profile(props: { login: LoginInfo }) {
    const [groups, setGroups] = useState<PartialGroup[]>([]);

    useEffect(() => {
        setGroups(
            [
                {
                    id: "1",
                    name: "3-D моделирование",
                    address: "Карельский бульвар, дом 20",
                    time: ["Понедельник  18:00 – 20:00"],
                    metro: "Чертаново",
                    timeToWalk: 17
                }
            ]
        )
    }, [])

    return <div className={styles.profile}>
        <h1 className={styles.title_card}>{`Здраствуйте, ${props.login.name ?? "Зоя"} ${props.login.surname ?? "Николаевна"}`}</h1>

        <center>
            <h2 className={styles.activity_title}>
                Ваши активности
            </h2>
        </center>

        <span className={styles.groups}>
            {
                groups.map(group =>
                    <GroupCardProfile key={group.id} group={group}/>
                )
            }
        </span>

        <center>
            <Link to={"/"}>
                <button className={"btn btn_primary"} style={{width: "100%"}}>
                    <h2 style={{color: "var(--white)"}}>
                        Подобрать новые активности
                    </h2>
                </button>
            </Link>
        </center>
    </div>
}