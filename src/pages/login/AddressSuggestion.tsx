import React, {useEffect, useState} from "react";
import {RoutesService} from "../../openapi";

import styles from "./AddressSuggestion.module.css"

export default function AddressSuggestion(props: {
    currentInput: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
}) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        props.currentInput !== "" && RoutesService.suggestApiV1RoutesSuggestGet(props.currentInput).then(setSuggestions)
    }, [props.currentInput]);

    return <center className={styles.suggestion}>
        <ul className={styles.suggestion_list}>
            {
                suggestions.slice(0, 3).map((suggestion, i) =>
                    <li key={i + suggestion} className={styles.suggestion_element}>
                        <button className={styles.button} type={"button"} onClick={() => props.setInput(suggestion)}>
                            {suggestion}
                        </button>
                    </li>
                )
            }
        </ul>
    </center>
}