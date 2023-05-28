import styles from "./GroupCardProfile.module.css";
import groupStyles from "../main/components/GroupCard.module.css";
import {Clock, MetroMarker, SmallMapMarker} from "../main/components/GroupCard";
import {PartialGroup} from "./Profile";
import React from "react";

export default function GroupCardProfile(props: {
    group: PartialGroup,
    onUnsubscribe?: (event: React.MouseEvent<HTMLButtonElement>, group: PartialGroup) => void
}) {
    const split_time = props.group.time.map(time => {
        const split = time.split(" ");
        const day = split[0];
        const timetime = split.slice(1).join(" ");
        return {
            day,
            time: timetime
        }
    });

    return (
        <div className={styles.card_outer}>
            <div className={styles.card_middle}>
                <div className={styles.card}>

                    <center>
                        <h2>
                            {props.group.name}
                        </h2>
                    </center>

                    <div className={groupStyles.date_place} aria-label={"Когда проводятся занятия"}>
                        <Clock aria_hidden={true}/>
                        <div className={groupStyles.dates}>
                            {split_time.map(({day, time}) =>
                                <p key={day} className={groupStyles.date}>
                                    <b>{day}</b>
                                    &nbsp;
                                    {time}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={groupStyles.address_place}>
                        <div className={groupStyles.address_string}>
                            <SmallMapMarker aria_hidden={true}/>
                            <p aria-label={"Адрес группы"}>{props.group.address}</p>
                        </div>
                        <div className={groupStyles.metro_string}>
                            <MetroMarker aria_hidden={true}/>
                            <p aria-label={"Метро"}>{props.group.metro}</p>
                            <p aria-hidden={true}> &#9679;</p>
                            <p aria-label={"Время от метро до группы"}>{props.group.timeToWalk} минут пешком</p>
                        </div>
                    </div>

                    <center className={styles.deny}>
                        <button className={"btn btn-secondary"}
                                onClick={event => props.onUnsubscribe && props.onUnsubscribe(event, props.group)}>
                            <h3>
                                Отказаться от занятий
                            </h3>
                        </button>
                    </center>
                </div>
            </div>
        </div>
    )
}