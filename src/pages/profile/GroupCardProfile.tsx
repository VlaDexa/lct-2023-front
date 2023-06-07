import styles from "./GroupCardProfile.module.css";
import Clock from "../../assets/icons/clock.svg";
import MapMarker from "../../assets/icons/map_marker.svg";
import Metro from "../../assets/icons/metro.svg";
import {PartialGroup} from "./Profile";
import React from "react";

export default function GroupCardProfile(props: {
    group: PartialGroup,
    onUnsubscribe?: (event: React.MouseEvent<HTMLButtonElement>, group: PartialGroup) => void
}) {
    // const split_time = props.group.time.map(time => {
    //     const split = time.split(" ");
    //     const day = split[0];
    //     const timetime = split.slice(1).join(" ");
    //     return {
    //         day,
    //         time: timetime
    //     }
    // });

    return (
        <div className={styles.card_outer}>
            <div className={styles.card_middle}>
                <div className={styles.card}>

                    <center>
                        <h2>
                            {props.group.name}
                        </h2>
                    </center>

                    <div className={styles.info}>
                        <div className={styles.time}>
                            <img src={Clock} alt={""} className={"filter_to_primary_green"}
                                 style={{width: 17, height: 17}}/>
                            <ul className={styles.time_list}>
                                {props.group.time.map(time => <li key={time}>{time}</li>)}
                            </ul>
                        </div>
                        <div className={styles.address_and_metro}>
                            <div className={styles.address}>
                                <img src={MapMarker} alt={""} className={"filter_to_primary_green"}
                                     style={{width: 16, height: 22}}/>
                                <span>{props.group.online ? "Онлайн" : props.group.address}</span>
                            </div>
                            {props.group.online ? undefined : <div className={styles.metro}>
                                <img src={Metro} alt={""} className={"filter_to_primary_green"}/>
                                <div className={styles.metro_inner}>
                                    <span><b>{props.group.metro}</b></span>
                                    <span>&#9679;</span>
                                    <span><b>{props.group.timeToWalk} минут пешком</b></span>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <button className={`btn btn-secondary ${styles.deny}`}
                            onClick={event => props.onUnsubscribe && props.onUnsubscribe(event, props.group)}>
                        <h4>
                            Отказаться от занятий
                        </h4>
                    </button>
                </div>
            </div>
        </div>
    )
}