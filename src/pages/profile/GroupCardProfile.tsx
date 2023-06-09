import styles from "./GroupCardProfile.module.css";
import Clock from "../../assets/icons/clock.svg";
import MapMarker from "../../assets/icons/map_marker.svg";
import Metro from "../../assets/icons/metro.svg";
import {PartialGroup} from "./Profile";
import React, {useRef} from "react";
import Days from "../../DateFormatter";
import {deduplicate} from "../main/components/GroupCard";
import {Dialog} from "../../Dialog";

export default function GroupCardProfile(props: {
    group: PartialGroup,
    onUnsubscribe?: (event: React.MouseEvent<HTMLButtonElement>, group: PartialGroup) => void
}) {
    const formattedTime = deduplicate(props.group.time.flatMap(time => new Days(time).days), (item) => item.day);
    const registerDialog = useRef<HTMLDialogElement>(null)

    return (
        <div className={styles.card_outer}>
            <Dialog dialogRef={registerDialog}>
                <div className={styles.deny_dialog}>
                    <h1 style={{color: "var(--primary-green)"}}>Вы уверены, что хотите отказаться от занятий?</h1>
                    <button className={"btn btn_primary"} onClick={() => registerDialog.current!.close()}
                            style={{marginTop: "20px"}}><b>Назад</b></button>
                    <button className={"btn btn-secondary"} onClick={event => {
                        props.onUnsubscribe && props.onUnsubscribe(event, props.group);
                        registerDialog.current!.close();
                    }}>Да
                    </button>
                </div>
            </Dialog>
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
                                {formattedTime.map(time =>
                                    <li key={time.day}>
                                        <h4>{time.toJSX()}</h4>
                                    </li>
                                )}
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
                            onClick={() => registerDialog.current!.showModal()}>
                        <h4>
                            Отказаться от занятий
                        </h4>
                    </button>
                </div>
            </div>
        </div>
    )
}