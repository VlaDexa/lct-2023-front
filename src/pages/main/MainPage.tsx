import Banner from "./components/Banner";
import {useEffect, useState} from "react";
import styles from "./MainPage.module.css";
import HorizontalButtons, {SelectedGroupType} from "./components/HorizontalButtons";
import {Group} from "./components/GroupCard";

type Filters = {
    type: SelectedGroupType
}

function Group(props: {group: Group}) {
    return <div>

    </div>
}

function Groups(props: {groups: Group[]}) {
    return <div>
        {props.groups.map(el => <Group key={el.id} group={el}/>)}
    </div>
}

async function getGroups(filters: Filters): Promise<Group[]> {
    return [];
}

export default function Main() {
    const [selectedType, setSelectedType] = useState(SelectedGroupType.All);
    const [group, setGroups] = useState<Group[]>([]);
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
        <HorizontalButtons selectedType={selectedType} setSelectedType={setSelectedType} className={styles.spacing_left}/>
    </div>
}