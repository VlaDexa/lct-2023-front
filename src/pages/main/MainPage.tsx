import Banner from "./components/Banner";
import React, {useContext, useEffect, useMemo, useState} from "react";
import styles from "./MainPage.module.css";
import HorizontalButtons, {SelectedGroupType} from "./components/HorizontalButtons";
import GroupCard, {Group, GroupType} from "./components/GroupCard";
import {ApiError, GroupsService, RecsService} from "../../openapi";
import {LoginContext} from "../../AfterLogin";
import LoginInfo from "../../LoginInfo";

export type Filters = {
    type: SelectedGroupType,
    page: number,
    recs: boolean,
    close: boolean
}

function Groups(props: { groups: Group[] }) {
    return <div className={styles.groups}>
        {props.groups.map((el, index) => <GroupCard key={el.id} group={el} index={index}/>)}
    </div>
}

function typeFilter(filters: Filters, groups: Group[]) {
    if (filters.type === SelectedGroupType.Online) {
        return groups.filter(group => group.metro === "Онлайн")
    } else if (filters.type === SelectedGroupType.InPerson) {
        return groups.filter(group => group.metro !== "Онлайн")
    } else {
        return groups;
    }
}

function pageFilter(filters: Filters, groups: Group[]) {
    groups = typeFilter(filters, groups);

    const AMOUNT_ON_PAGE = 6;
    return groups.slice(filters.page * AMOUNT_ON_PAGE, filters.page * AMOUNT_ON_PAGE + AMOUNT_ON_PAGE);
    // return groups;
}

async function getGroups(loginInfo: LoginInfo): Promise<Group[]> {
    const groups_nums: number[] = await RecsService.giveRecsApiV1RecsGet().catch((error) => {
        if (!(error instanceof ApiError && error.status === 401)) throw error;
        return loginInfo.resetToken().then(() => RecsService.giveRecsApiV1RecsGet());
    })

    const groups: Group[] = (
        await GroupsService.readGroupApiV1GroupsGroupsPost(groups_nums).catch((error) => {
            if (!(error instanceof ApiError && error.status === 401)) throw error;
            return loginInfo.resetToken().then(() => GroupsService.readGroupApiV1GroupsGroupsPost(groups_nums));
        })
    ).map(group => {
        return {
            type: group.type.toLowerCase() as GroupType,
            name: group.name,
            address: group.address,
            metro: group.metro!,
            timeToWalk: group.timeToWalk,
            id: group.id.toString(),
            description: group.description,
            time: Array.isArray(group.time) ? group.time : group.time.split("; ")
        }
    });
    return groups;
}

function PageSwitcher(props: {
    maxPages: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}) {
    const nextButton = useMemo(() =>
        <button className={"btn btn_primary"} onClick={() => props.setPage(old => old + 1)}>
            <h3 style={{margin: 0}}>Далее</h3>
        </button>, [props.setPage]
    );
    const prevButton = useMemo(() =>
        <button className={"btn btn_primary"} onClick={() => props.setPage(old => old - 1)}>
            <h3 style={{margin: 0}}>Назад</h3>
        </button>, [props.setPage]
    );

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [props.page])

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

    const loginInfo = useContext(LoginContext);

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
        getGroups(loginInfo).catch(error => {
            if (!(error instanceof ApiError && error.status === 401)) throw error
            return loginInfo.resetToken().then(() => getGroups(loginInfo));
        }).then(setGroups);
    }, [loginInfo]);

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