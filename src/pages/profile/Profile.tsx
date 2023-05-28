import styles from "./Profile.module.css";
import {LoginInfo} from "../../App";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GroupCardProfile from "./GroupCardProfile";
import {GroupsService} from "../../openapi";

export type PartialGroup = {
    id: number,
    name: string,
    address: string,
    metro: string,
    // time: string[]
}

export default function Profile(props: { login: LoginInfo }) {
    const [groups, setGroups] = useState<PartialGroup[]>([]);

    useEffect(() => {
        GroupsService.getAttendsByIdApiV1GroupsAttendsUserGet().then((groups): PartialGroup[] => {
            return groups.map((group): PartialGroup => {
                return {
                    name: group.direction_3,
                    id: group.id,
                    metro: group.metro,
                    address: group.address,
                }
            })
        }).then(setGroups);

        // setGroups(
        //     [
        //         {
        //             id: "1",
        //             name: "3-D моделирование",
        //             address: "Карельский бульвар, дом 20",
        //             time: ["Понедельник  18:00 – 20:00"],
        //             metro: "Чертаново",
        //             timeToWalk: 17
        //         }
        //     ]
        // )
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
                    <GroupCardProfile key={group.id} group={group} onUnsubscribe={() => {
                        GroupsService.deleteAttendsApiV1GroupsAttendsIdDelete(group.id)
                    }}/>
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