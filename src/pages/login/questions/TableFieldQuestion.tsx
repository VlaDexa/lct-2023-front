import {QuestionElement} from "./QuestionSkeleton";
import styles from "./Question.module.css";
import {useEffect, useState} from "react";

export type TableFieldQuestionElementProps = {
    things: { label: string, name: string }[]
};

export const TableFieldQuestionElement: QuestionElement<string, TableFieldQuestionElementProps> = (props) => {
    const [selected, setSelected] = useState<boolean[]>(props.things.map(() => false));

    useEffect(() => {
        if (!selected.some(el => !el)) {
            props.setShouldUnblock(true);
        }
    }, [selected]);

    return <table className={[props.className, styles.table].join(" ")}>
        <thead>
        <tr aria-label={"Варианты"}>
            <th/>
            <th><b>Нет</b></th>
            <th><b>Скорее<br/>нет</b></th>
            <th><b>Средне</b></th>
            <th><b>Скорее<br/>да</b></th>
            <th><b>Да</b></th>
        </tr>
        </thead>
        <tbody>
        {
            props.things.map((thing, index) =>
                <tr key={thing.label} className={styles.table_row} aria-label={thing.label}>
                    <td aria-hidden={true}>{thing.label}</td>
                    {
                        [0, 0, 0, 0, 0].map((_, i, arr) =>
                            <td key={index * arr.length + i} className={styles.table_cell}>
                                <input required={true} type={"radio"}
                                       className={["checkbox_like_radio", styles.input].join(" ")} name={thing.name}
                                       tabIndex={0} value={i} onChange={() => {
                                    setSelected(old => {
                                        old[index] = true;
                                        return [...old];
                                    })
                                }}/>
                            </td>
                        )
                    }
                </tr>
            )
        }
        </tbody>
    </table>
}