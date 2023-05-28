import Banner from "./components/Banner";
import React, {useEffect, useMemo, useState} from "react";
import styles from "./MainPage.module.css";
import HorizontalButtons, {SelectedGroupType} from "./components/HorizontalButtons";
import GroupCard, {Group, GroupType} from "./components/GroupCard";

type Filters = {
    type: SelectedGroupType
}

function Groups(props: {groups: Group[]}) {
    return <div className={styles.groups}>
        {props.groups.map((el, index) => <GroupCard key={el.id} group={el} index={index}/>)}
    </div>
}

async function getGroups(filters: Filters): Promise<Group[]> {
    return [{
        time: ["Понедельник 18:00 - 20:00"],
        id: "1",
        timeToWalk: 17,
        metro: "Чертаново",
        address: "Карельский бульвар, дом 20",
        tags: [
            "для эрудиции",
            "для общения",
            "для любопытных"
        ],
        type: GroupType.Intellectual,
        name: "3-D моделирование"
    },
        {
            time: ["Понедельник 18:00 - 20:00", "Понедельник 18:00 - 20:00"],
            id: "2",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            tags: [
                "для эрудиции",
                "для общения",
                "для любопытных"
            ],
            type: GroupType.Intellectual,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "3",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            tags: [
                "для эрудиции",
                "для общения",
                "для любопытных"
            ],
            type: GroupType.Intellectual,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "4",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            tags: [
                "для эрудиции",
                "для общения",
                "для любопытных"
            ],
            type: GroupType.Intellectual,
            name: "3-D моделирование"
        },
    ];
}

function PageSwitcher(props: {
    maxPages: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}) {
    const nextButton = useMemo(() =>
        <button className={"btn btn_primary"} onClick={() => props.setPage(old => old + 1)}>
            <b>Далее</b>
        </button>, [props.setPage]
    );
    const prevButton = useMemo(() =>
        <button className={"btn btn_primary"} onClick={() => props.setPage(old => old - 1)}>
            <b>Назад</b>
        </button>, [props.setPage]
    );

    if (props.maxPages <= 1) {
        return <></>
    } else if (props.page == 0) {
        return <div className={styles.single_button}>
            {nextButton}
        </div>
    } else if (props.page >= props.maxPages) {
        return <div className={styles.single_button}>
            {prevButton}
        </div>
    } else {
        return <div className={styles.two_buttons}>
            {prevButton}
            {nextButton}
        </div>
    }
}

export default function Main() {
    const [selectedType, setSelectedType] = useState(SelectedGroupType.All);
    const [groups, setGroups] = useState<Group[]>([]);
    const [filters, setFilters] = useState<Filters>({
        type: selectedType
    });
    const [page, setPage] = useState(0);

    useEffect(() => {
        setFilters({
            type: selectedType
        });
    }, [selectedType])

    useEffect(() => {
        getGroups(filters).then(setGroups);
    }, [filters])

    return <>
        <Banner/>
        <HorizontalButtons selectedType={selectedType} setSelectedType={setSelectedType}
                           className={styles.spacing_left}/>
        <Groups groups={groups}/>
        <PageSwitcher page={page} setPage={setPage} maxPages={groups.length / 6}/>
    </>
}