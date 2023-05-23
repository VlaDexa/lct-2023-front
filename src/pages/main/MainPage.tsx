import Banner from "./components/Banner";
import {useEffect, useState} from "react";
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
        time: ["ПН 18:00-20:00"],
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
            time: ["ПН 18:00-20:00", "Ещё время"],
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
            time: ["ПН 18:00-20:00"],
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
            time: ["ПН 18:00-20:00"],
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

export default function Main() {
    const [selectedType, setSelectedType] = useState(SelectedGroupType.All);
    const [groups, setGroups] = useState<Group[]>([]);
    const [filters, setFilters] = useState<Filters>({
        type: selectedType
    });

    useEffect(() => {
        setFilters({
            type: selectedType
        });
    }, [selectedType])

    useEffect(() => {
        getGroups(filters).then(setGroups);
    }, [filters])

    return <div>
        <Banner/>
        <HorizontalButtons selectedType={selectedType} setSelectedType={setSelectedType}
                           className={styles.spacing_left}/>
        <Groups groups={groups}/>
    </div>
}