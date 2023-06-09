import styles from "./Question.module.css";
import {QuestionElement} from "./QuestionSkeleton";

export type FieldSetQuestionElementProps = {
    options: string[],
    answerName: string,
}

export const FieldSetQuestionElement: QuestionElement<string, FieldSetQuestionElementProps> = (props) => {
    return (
        <fieldset className={props.className}>
            {props.options.map((option) => (
                <label key={option} style={{display: "flex", flexDirection: "row", gap: "8px"}}>
                    <input type="radio" name={props.answerName} value={option}
                           className={["checkbox_like_radio", styles.input].join(" ")}
                           onChange={() => props.setShouldUnblock(true)}
                           required={true}
                    />
                    <span style={{placeSelf: "center"}}>{option}</span>
                </label>
            ))}
        </fieldset>
    );
};