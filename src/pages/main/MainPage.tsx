import Banner from "./components/Banner";
import {useEffect, useState} from "react";
import styles from "./MainPage.module.css";
import {useCallback, useState} from "react";

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