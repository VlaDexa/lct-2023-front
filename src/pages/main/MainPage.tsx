import Banner from "./components/Banner";
import React, {useEffect, useMemo, useState} from "react";
import styles from "./MainPage.module.css";
import HorizontalButtons, {SelectedGroupType} from "./components/HorizontalButtons";
import GroupCard, {Group, GroupType} from "./components/GroupCard";

export type Filters = {
    type: SelectedGroupType,
    page: number,
    recs: boolean,
    close: boolean
}

function Groups(props: {groups: Group[]}) {
    return <div className={styles.groups}>
        {props.groups.map((el, index) => <GroupCard key={el.id} group={el} index={index}/>)}
    </div>
}

function pageFilter(filters: Filters, groups: Group[]) {
    const AMOUNT_ON_PAGE = 6;
    return groups.slice(filters.page * AMOUNT_ON_PAGE, filters.page * AMOUNT_ON_PAGE + AMOUNT_ON_PAGE);
    // return groups;
}

async function getGroups(): Promise<Group[]> {
    const groups = new Promise<Group[]>(resolve => resolve([{
        time: ["Понедельник 18:00 - 20:00"],
        id: "1",
        timeToWalk: 17,
        metro: "Чертаново",
        address: "Карельский бульвар, дом 20",
        type: GroupType.Game,
        name: "3-D моделирование"
    },
        {
            time: ["Понедельник 18:00 - 20:00", "Вторник 18:00 - 20:00"],
            id: "2",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Education,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "3",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Singing,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "4",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Painting,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "5",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Intellectual,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "6",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Theatre,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "7",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.SilverUni,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "8",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Trainings,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "9",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Dancing,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "10",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Creativity,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "11",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Physical,
            name: "3-D моделирование"
        },
        {
            time: ["Понедельник 18:00 - 20:00"],
            id: "12",
            timeToWalk: 17,
            metro: "Чертаново",
            address: "Карельский бульвар, дом 20",
            type: GroupType.Physical,
            name: "3-D моделирование"
        },
    ]));

    return groups;
}

function PageSwitcher(props: {
    maxPages: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}) {
    const nextButton = useMemo(() =>
        <button className={"btn btn_primary"} onClick={() => props.setPage(old => old + 1)}>
            <h3 style={{margin: 0}}><b>Далее</b></h3>
        </button>, [props.setPage]
    );
    const prevButton = useMemo(() =>
        <button className={"btn btn_primary"} onClick={() => props.setPage(old => old - 1)}>
            <h3 style={{margin: 0}}><b>Назад</b></h3>
        </button>, [props.setPage]
    );

    if (props.maxPages == 0) {
        return <></>
    } else if (props.page == 0) {
        return <div className={styles.single_button}>
            {nextButton}
        </div>
    } else if (props.page == props.maxPages) {
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
    const [shownGroups, setShownGroups] = useState(groups);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState<Filters>({
        type: selectedType,
        page,
        recs: true,
        close: false
    });

    useEffect(() => {
        setFilters((old) => {
            return {
                ...old,
                type: selectedType,
                page
            }
        });
    }, [selectedType, page])

    useEffect(() => {
        getGroups().then(setGroups);
    }, []);

    useEffect(() => {
        setShownGroups(pageFilter(filters, groups));
    }, [filters, groups])

    return <>
        <Banner/>
        <HorizontalButtons selectedType={selectedType} setSelectedType={setSelectedType}
                           className={styles.spacing_left} setFilters={setFilters} recs={true}/>
        <Groups groups={shownGroups}/>
        <PageSwitcher page={page} setPage={setPage} maxPages={Math.ceil(groups.length / 6) - 1}/>
    </>
}