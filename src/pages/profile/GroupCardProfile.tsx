import styles from "./GroupCardProfile.module.css";
import Clock from "../../assets/icons/clock.svg";
import MapMarker from "../../assets/icons/map_marker.svg";
import Metro from "../../assets/icons/metro.svg";
import {PartialGroup} from "./Profile";
import React from "react";
import Days from "../../DateFormatter";
import {deduplicate} from "../main/components/GroupCard";

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
    const formattedTime = deduplicate(props.group.time.flatMap(time => new Days(time).days), (item) => item.day);

    return (
        <div className={styles.card_outer}>
            <div className={styles.card_middle}>
                <div className={styles.card}>

                    <center>
                        <h3 style={{color: "var(--text-active)"}}>
                            {props.group.name}
                        </h3>
                    </center>

                    <div className={styles.info}>
                        <div className={styles.time}>
                            <img src={Clock} alt={""} className={"filter_to_primary_green"}
                                 style={{width: 17, height: 17}}/>
                            <ul className={styles.time_list}>
                                {formattedTime.map(time => <li key={time.day}>
                                    {time.toJSX()}
                                </li>)}
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