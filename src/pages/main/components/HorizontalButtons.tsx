import styles from "./HorizontalButtons.module.css";
import Calendar from "./../../../assets/icons/calendar.svg";
import MapMarker from "./../../../assets/icons/map_marker.svg";
import {MouseEventHandler, useEffect} from "react";

export enum SelectedGroupType {
    All,
    InPerson,
    Online,
}

function GroupTypePicker(props: {
    selectedType: SelectedGroupType,
    setSelectedType: (type: SelectedGroupType) => void
}) {
    return <div className={styles.group_type_picker}>
        <button className={props.selectedType === SelectedGroupType.All ? styles.active : undefined} onClick={() => props.setSelectedType(SelectedGroupType.All)}>Всё</button>
        <button className={props.selectedType === SelectedGroupType.InPerson ? styles.active : undefined} onClick={() => props.setSelectedType(SelectedGroupType.InPerson)}>Очно</button>
        <button className={props.selectedType === SelectedGroupType.Online ? styles.active : undefined} onClick={() => props.setSelectedType(SelectedGroupType.Online)}>Онлайн</button>
    </div>
}

function LinkButton(props: {
    icon: string,
    children: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}) {
    return <button className={styles.link_button} onClick={props.onClick}>
        <img src={props.icon} alt={""}/>
        <p>{props.children}</p>
    </button>
}

export default function HorizontalButtons(
    props: {
        selectedType: SelectedGroupType,
        setSelectedType: (type: SelectedGroupType) => void,
        className?: string
    }
) {
    const classes = [styles.horizontal_row];
    if (props.className) {
        classes.push(props.className);
    }
    return <div className={classes.join(" ")}>
        <GroupTypePicker selectedType={props.selectedType} setSelectedType={props.setSelectedType}/>
        <LinkButton icon={MapMarker}>Карта мероприятий</LinkButton>
        <LinkButton icon={Calendar}>Календарь мероприятий</LinkButton>
    </div>
}