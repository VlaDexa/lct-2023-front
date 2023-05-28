import styles from "./HorizontalButtons.module.css";
import React, {useCallback, useState} from "react";
import {Filters} from "../MainPage";

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
        <button className={props.selectedType === SelectedGroupType.All ? styles.active : undefined}
                onClick={() => props.setSelectedType(SelectedGroupType.All)}>Всё
        </button>
        <button className={props.selectedType === SelectedGroupType.InPerson ? styles.active : undefined}
                onClick={() => props.setSelectedType(SelectedGroupType.InPerson)}>Очно
        </button>
        <button className={props.selectedType === SelectedGroupType.Online ? styles.active : undefined}
                onClick={() => props.setSelectedType(SelectedGroupType.Online)}>Онлайн
        </button>
    </div>
}

function SelectButton(props: {
    icon: string,
    children: string,
    onClick?:
        (event: React.MouseEvent<HTMLButtonElement>, isActive: boolean) => void,
    active?: boolean
}) {
    const [pressed, setPressed] = useState(props.active || false);

    return <button className={[styles.link_button, pressed ? styles.active : undefined].join(" ")} onClick={(event) => {
        setPressed(old => !old);
        props.onClick && props.onClick(event, pressed);
    }}>
        <img src={props.icon} alt={""}/>
        <p>{props.children}</p>
    </button>
}

export default function HorizontalButtons(
    props: {
        selectedType: SelectedGroupType,
        setSelectedType: (type: SelectedGroupType) => void,
        setFilters: React.Dispatch<React.SetStateAction<Filters>>
        className?: string,
        recs: boolean
    }
) {
    const classes = [styles.horizontal_row];
    if (props.className) {
        classes.push(props.className);
    }

    const clickRecs = useCallback<((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, isActive: boolean) => void)>((_, active) => {
        props.setFilters(old => {
                old.recs = active;
                return {...old}
            }
        );
    }, [props.setFilters]);

    const clickClose = useCallback<((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, isActive: boolean) => void)>((_, active) => {
        props.setFilters(old => {
                old.close = active;
                return {...old}
            }
        );
    }, [props.setFilters]);

    return <div className={classes.join(" ")}>
        <GroupTypePicker selectedType={props.selectedType} setSelectedType={props.setSelectedType}/>
        {/*<SelectButton icon={Star} onClick={clickRecs} active={props.recs}>Подобрано для меня</SelectButton>*/}
        {/*<SelectButton icon={MapMarker} onClick={clickClose}>Близко ко мне</SelectButton>*/}
    </div>
}